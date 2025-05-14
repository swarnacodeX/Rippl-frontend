// src/hooks/useChatList.js
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const useChatList = () => {
  const usernameGlobal = useSelector((state) => state.user.usernameGlobal);
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    async function fetchChatList() {
      try {
        const response = await axios.post("http://localhost:2401/api/chats/chatList", {
          username: usernameGlobal,
        });
        setChatList(response.data);
      } catch (error) {
        console.error("Error fetching chat list:", error);
      }
    }

    if (usernameGlobal) {
      fetchChatList();
    }
  }, [usernameGlobal]);

  return chatList;
};

export default useChatList;
