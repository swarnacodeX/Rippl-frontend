import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import axios from "axios";
import useChatList from "./useChatList";
import "../styles/chatPage.css";

// Initialize socket connection
const socket = io("http://localhost:3002");

function Chat() {
  const [message, setMessage] = useState("");
  const chatList = useChatList();
  const [chats, setChats] = useState([]);
  const [roomId, setRoomId] = useState("");

  // 🔁 Access username from Redux store
  const usernameGlobal = useSelector((state) => state.user.usernameGlobal);

  // 🔻 Receive messages via socket
  useEffect(() => {
    socket.on("receive-message", (newMessage) => {
      setChats((prevChats) => [...prevChats, newMessage]);
    });

    return () => {
      socket.off("receive-message");
    };
  }, []);

  // 📤 Send message
  async function handleSendMessage(message, roomId) {
    if (!message.trim() || !roomId) return;
    const newMessage = { username: usernameGlobal, message, roomId };
    socket.emit("send-message", { newMessage, roomId });
    setMessage("");
    handleChatClick(roomId);

    try {
      await axios.post("http://localhost:2401/api/chats/storeChats", newMessage);
    } catch (error) {
      console.error("Failed to store the message:", error);
    }
  }

  // 🟢 Join chat room and fetch messages
  async function handleChatClick(roomId) {
    setRoomId(roomId);
    socket.emit("join-room", roomId);

    try {
      const res = await axios.post("http://localhost:2401/api/chats/fetchChats", {
        roomId,
      });
      setChats(res.data);
    } catch (error) {
      console.error("Failed to fetch chats:", error);
    }
  }

  // ✨ Get other participant's name
  function getChatGroupName(user1, user2) {
    if (user1 && user2) {
      const concatenated = user1 + user2;
      return concatenated.replace(usernameGlobal, "") || "Unnamed Group";
    }
    return "Unnamed Group";
  }

  return (
    <div>
      <h2>Messages</h2>
      <div>
        <ul>
          {chatList.map((chat, index) => (
            <li className="chats" key={index}>
              <button
                className="chat-button"
                onClick={() => handleChatClick(chat.groupid)}
              >
                {getChatGroupName(chat.user1, chat.user2)}
              </button>
            </li>
          ))}
        </ul>

        <div className="chat-display">
          <ul>
            {chats.map((chat, index) => (
              <li key={index} className="chat-message">
                <strong>{chat.sender}:</strong> {chat.message}
              </li>
            ))}
          </ul>
        </div>

        <div className="input-group">
          <input
            className="input"
            type="text"
            placeholder="Message"
            autoComplete="off"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            className="button--submit"
            onClick={() => handleSendMessage(message, roomId)}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
