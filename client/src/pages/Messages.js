import React, { useEffect, useState } from "react";
import BadRequestPage from "./BadRequestPage";
import Spinner from "../components/utilsComponents/Spinner";

function Messages() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [messages, setMessages] = useState("");
  const [data, setData] = useState("");

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("data"));
    setData(userData);
  }, []);
  const adminToken = data?.user?.role === "admin" ? data?.accessToken : null;

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await fetch("http://localhost:5000/message", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + adminToken,
          },
        });
        const result = await res.json();
        if (!res.ok) {
          throw new Error(result);
        }
        setMessages(result);
      } catch (err) {
        console.log(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getMessages();
  }, [adminToken]);

  const markAsRead = async (id) => {
    try {
      const res = await fetch("http://localhost:5000/message/" + id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + adminToken,
        },
      });
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result);
      }
      const index = messages.findIndex((message) => message._id === id);
      if (index !== -1) {
        // Create a new array with the updated message
        const updatedMessages = [
          ...messages?.slice(0, index),
          result,
          ...messages.slice(index + 1),
        ];

        setMessages(updatedMessages);
      }
    } catch (err) {
      setError(true);
    }
  };

  if (!data || data.length === 0) {
    return <BadRequestPage />;
  }

  return (
    <div className="mt-36 mx-6 w-fit flex items-center justify-center gap-8 flex-wrap">
      {loading && <Spinner />}
      {!loading &&
        messages &&
        messages?.map((message) => (
          <div
            key={message?._id}
            onClick={() => markAsRead(message?._id)}
            className={`border border-gray-300 p-4 rounded-lg mb-4 ${
              message?.read ? "bg-gray-100" : "bg-[#ec981a]"
            }`}
          >
            <div className="font-semibold">{message?.name}</div>
            <div className="text-gray-700">{message?.email}</div>
            <div className="mt-2">{message?.msg}</div>
          </div>
        ))}
    </div>
  );
}

export default Messages;
