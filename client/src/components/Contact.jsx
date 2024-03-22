import React, { useState } from "react";

function Contact() {
  const [message, setMessage] = useState({
    name: "",
    email: "",
    msg: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [res, setRes] = useState({
    msg: "",
  });
  const [time, setTime] = useState(false);
  // console.log(message);
  const handleSendMsg = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch("https://typastore.up.railway.app/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: message.name.length > 1 ? message.name : null,
          email: message.name.length > 1 ? message.email : null,
          msg: message.name.length > 1 ? message.msg : null,
        }),
      });
      const result = await response.json();

      console.log(result);
      if (!response.ok) {
        throw new Error(result.error);
      }
      setError(false);
      setRes({ ...res, msg: result.msg });
    } catch (err) {
      console.log(err.message);
      setError(true);
    } finally {
      setLoading(false);
      setMessage({
        msg: "",
        name: "",
        email: "",
      });
      setTime(true);
      setTimeout(() => {
        setTime(false);
      }, 2500);
    }
  };

  return (
    <>
      <div
        id="contact"
        className="flex items-center justify-center flex-row-reverse py-32 gap-20"
      >
        <div className="w-80 lg:w-[25.75rem] h-[33.875rem] flex-1/2 md:block hidden">
          <img
            src="/assets/bg-1.png"
            alt="form bg"
            className="w-full rounded-3xl h-full object-cover "
          />
        </div>
        <form
          className="flex flex-col h-full gap-7 md:flex-1/2 w-[85%]  sm:w-72 lg:w-[23.75rem]"
          onSubmit={handleSendMsg}
        >
          <input
            type="text"
            placeholder="name"
            className="h-16 rounded-lg px-4 lg:px-8  py-2 lg:py-4 text-lg lg:text-2xl"
            required={true}
            value={message.name}
            onChange={(e) => setMessage({ ...message, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="email"
            className="h-16 rounded-lg px-4 lg:px-8  py-2 lg:py-4 text-lg lg:text-2xl"
            required={true}
            value={message.email}
            onChange={(e) => setMessage({ ...message, email: e.target.value })}
          />
          <textarea
            type="text"
            placeholder="Message"
            className="h-[16.9375rem] rounded-lg px-4 lg:px-8  py-2 lg:py-4 text-lg lg:text-2xl"
            required={true}
            value={message.msg}
            onChange={(e) => setMessage({ ...message, msg: e.target.value })}
          />
          <button
            className="rounded-lg bg-[#ec981a] hover:bg-[#d48917] transition-colors text-white h-16   px-4 lg:px-8  py-2 lg:py-4 text-lg lg:text-2xl"
            disabled={loading}
          >
            {loading ? "loading ..." : "send"}
          </button>
        </form>
      </div>

      {time && (
        <p
          className={`flex items-center justify-center flex-row-reverse gap-12  text-3xl font-semibold  ${
            error ? "text-red-600" : "text-[#ec981a]"
          } `}
        >
          {error ? "Internal server error, please try again later" : res.msg}
        </p>
      )}
    </>
  );
}

export default Contact;
