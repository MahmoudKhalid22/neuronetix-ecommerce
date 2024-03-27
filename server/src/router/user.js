const router = require("express").Router();
const passport = require("passport");
const {
  newUser,
  verificationEmail,
  loginUser,
  logoutUser,
  forgetPassword,
  resetPassword,
  newToken,
  updateUsername,
  updateEmail,
  updateUserPassword,
  getUsers,
  addUser,
  deleteUser,
  getUser,
  getOneUser,
  uploadAvatar,
  verifyForgetPasswordToken,
} = require("../controller/user");

const auth = require("../middleware/auth");
const authByRefreshToken = require("../middleware/authRefreshToken");
const multer = require("multer");

// START AUTHENTICATION //
// USER OR ADMIN (as a user)

router.post("/signup", newUser);

router.get("/verify/:token", verificationEmail);

router.post("/login", loginUser);

router.post("/logout", auth, logoutUser);

router.post("/forget-password", forgetPassword);

router.get("/forget-password/:token", verifyForgetPasswordToken);

router.post("/reset-password/:token", resetPassword);

router.get("/refresh-token", authByRefreshToken, newToken);

router.put("/update-username", auth, updateUsername);

router.put("/update-email", auth, updateEmail);

router.put("/update-password", auth, updateUserPassword);

const upload = multer();
router.post(
  "/upload-avatar",
  auth,
  upload.single("avatar"),
  uploadAvatar,
  (error, req, res, next) => res.status(500).json({ error: error.message })
);

router.get("/me", auth, getUser);

// GOOGLE OAUTH
// redirect to register page
// router.get(
//   "/auth/google",
//   passport.authenticate("google", { scope: ["email", "profile"] })
// );
// redirect to failure page
// router.get("/failure", (req, res) => {
//   res.send({ message: "failure" });
// });

// callback redirect
// router.get(
//   "/details",
//   passport.authenticate("google", {
//     successRedirect: "http://localhost:5000/details",
//     failureRedirect: "/user/failure",
//   })
// );

// oauth with facebook
// router.get("/auth/facebook", passport.authenticate("facebook"));

// router.get(
//   "/auth/facebook/callback",
//   passport.authenticate("facebook", { failureRedirect: "/user/login" }),
//   function (req, res) {
//     // Successful authentication, redirect home.
//     res.redirect("http://localhost:5000");
//   }
// );

// END OF AUTHENTICATION //

// FOR ADMIN //
// - block user
router.get("/admin", auth, getUsers);
router.get("/admin/:id", getOneUser);

router.delete("/admin/:id", auth, deleteUser);
router.post("/admin", auth, addUser);

// FOR USER
// rate product, add review, add product to cart

// TEST REQUEST
router.get("/test", (req, res) => {
  res.send({ msg: "test" });
});

module.exports = router;
