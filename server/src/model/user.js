const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Table = require("./product");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      min: 3,
      max: 30,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: function () {
        return !this.facebookId;
      },
    },
    password: {
      type: String,
      required: function () {
        return !this.googleId && !this.facebookId;
      },
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "user"],
    },
    address: {
      type: String,
      required: function () {
        return this.role === "user";
      },
    },
    verified: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["active, blocked"],
      default: "active",
    },
    avatar: {
      type: String,
    },
    googleId: {
      type: String,
    },
    facebookId: {
      type: String,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    cart: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// RELATION BETWEEN USERS AND TASKS
userSchema.virtual("products", {
  ref: "Product",
  localField: "_id",
  foreignField: "owner",
});

// DELETE PRIVATE DATA
userSchema.methods.toJSON = function () {
  const user = this;
  const userObj = user.toObject();
  delete userObj.password;
  delete userObj.tokens;
  delete userObj.verified;
  delete userObj.__v;
  return userObj;
};

// CREATE TOKEN
userSchema.methods.createAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};
// CREATE REFRESH TOKEN
userSchema.methods.createRefreshToken = async function () {
  const user = this;
  const token = jwt.sign(
    { _id: user._id.toString() },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "30d",
    }
  );
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

// LOGIN
userSchema.statics.findByCredentials = async function (email, password) {
  const user = await User.findOne({ email });

  if (!user) throw new Error("الاسم غير موجود");

  if (!user.verified) throw new Error("يجب تفعيل الحساب أولا");

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) throw new Error("كلمة السر غير صحيحة");
  return user;
};

// HASH PASSWORD
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password"))
    user.password = await bcrypt.hash(user.password, 8);
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
