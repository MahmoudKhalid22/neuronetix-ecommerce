const test = async () => {
  try {
    const response = await fetch("http://localhost:5000/user/test");
    if (!response.ok) {
      throw new Error(await response.json());
    }
    console.log(await response.json());
  } catch (err) {
    console.log(err.message);
  } finally {
    setTimeout(test, 600000);
  }
};

module.exports = { test };
