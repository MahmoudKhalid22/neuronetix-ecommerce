const express = require("express");
require("dotenv").config();
const passport = require("passport");
const session = require("express-session");
const cors = require("cors");
const path = require("path");
const hpp = require("hpp");
require("./config/dbConnection");
// require("./controller/OAuth");
const { test } = require("./utils/testReq");
const userRouter = require("./router/user");
const productRouter = require("./router/product");
const msgRouter = require("./router/message");
const { docs } = require("./utils/swagger");

const app = express();
const corsOption = {
  origin: ["https://typastore.vercel.app", "http://localhost:3000"],
};

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("trust proxy", 1);

app.use(express.json());
app.use(hpp());
app.use(cors(corsOption));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/message", msgRouter);

docs(app);

app.get("*", (req, res) => {
  res.render("404");
});
const port = process.env.PORT;

app.listen(port, () => {
  console.log("Server is running on port http://localhost:" + port);
  test();
});
