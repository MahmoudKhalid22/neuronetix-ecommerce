const test = async () => {
  try {
    const response = await fetch("https://typa.onrendera.com/user/test");
    if (!response.ok) {
      throw new Error(await response.json());
    }
  } catch (err) {
    // console.log(err.message);
  } finally {
    setTimeout(test, 600000);
  }
};

module.exports = { test };
