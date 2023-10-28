/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useSocket } from "../../context/SocketProvider";
import { ChatService } from "../../services/chat.service";

const useContainer = () => {
  const [conversations, setConversations] = useState([]);
  const [isDisconnected, setIsDisconnected] = useState(false);

  const { socket } = useSocket();
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);

  //#region handlers
  function handleSelectConversation(conversation: Conversation) {
    if (selectedConversation?._id) {
      socket.emit("leave", { conversationId: selectedConversation?._id });
    }
    if (conversation._id !== selectedConversation?._id) {
      setSelectedConversation(conversation);
      socket.emit("join", { conversationId: conversation._id });
    }
  }
  //#endregion

  //#region life cycle methods
  useEffect(() => {
    socket.on("disconnect", () => {
      setIsDisconnected(true);
    });
    return () => {
      socket.off("disconnect");
    };
  }, []);

  useEffect(() => {
    if (!isDisconnected && selectedConversation?._id) {
      socket.emit("join", { conversationId: selectedConversation._id });
    }
  }, [isDisconnected]);

  useEffect(() => {
    if (isDisconnected) {
      socket.on("connect", () => {
        console.log("Server come back online");
        setIsDisconnected(false);
      });
    }
    return () => {
      socket.off("connect");
    };
  }, [isDisconnected]);

  useEffect(() => {
    async function getConversation() {
      try {
        const conversations = await ChatService.getConversation();
        setConversations(conversations);
      } catch (error) {
        alert(error);
      }
    }
    getConversation();
  }, []);

  //#endregion
  return {
    handleSelectConversation,
    conversations,
    selectedConversation,
  };
};

export default useContainer;
