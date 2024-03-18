const {
  getMessages,
  messageForm,
  getOneMessage,
  readMessage,
} = require("../controller/message");
const auth = require("../middleware/auth");

const router = require("express").Router();

router.post("/", messageForm);
router.get("/", auth, getMessages);

router.get("/:id", auth, getOneMessage);
router.patch("/:id", auth, readMessage);

module.exports = router;
