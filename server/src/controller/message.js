const Message = require("../model/Message");

const messageForm = async (req, res) => {
  try {
    const { name, email, msg } = req.body;

    const message = new Message({ name: name, email: email, msg: msg });
    await message.save();
    res.send({ msg: "your message has been sent" });
  } catch (err) {
    res.status(500).send({ error: "internal server error" });
  }
};

const getMessages = async (req, res) => {
  try {
    const isAdmin = req.user[0].role === "admin";
    if (!isAdmin)
      return res.status(400).send({ error: "you're not the admin" });
    const messages = await findAllMessages();
    res.send(messages);
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};

const getOneMessage = async (req, res) => {
  try {
    const messageId = req.params.id;
    const isAdmin = req.user[0].role === "isAdmin";
    if (!isAdmin)
      return res.status(400).send({ error: "you're not the admin" });
    const message = await Message.findOne({ _id: messageId });
    if (!message) {
      res.status(404).send({ error: "message is not found" });
    }
    res.send(message);
  } catch (err) {
    res.status(500).send({ error: "Internal server error" });
  }
};

const readMessage = async (req, res) => {
  try {
    const messageId = req.params.id;
    const isAdmin = req.user[0].role === "isAdmin";
    if (!isAdmin)
      return res.status(400).send({ error: "you're not the admin" });
    const msg = await Message.findByIdAndUpdate(
      messageId,
      { read: true },
      { new: true }
    );
    res.send(msg);
  } catch (err) {
    res.status(500).send({ error: "Internal server error" });
  }
};

module.exports = { messageForm, getMessages, getOneMessage, readMessage };
