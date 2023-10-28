import { useEffect, useState } from "react";
import { useSocket } from "../../../../context/SocketProvider";
import { ChatService } from "../../../../services/chat.service";

interface IProps {
  conversationId: string;
}

const useContainer = ({ conversationId }: IProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const { socket } = useSocket();
  //#region handler functions
  function handleMessageChange(msg: string) {
    setMessage(msg);
  }
  async function submitHandler() {
    try {
      await ChatService.sendMessage(conversationId, message);
      setMessage("");
    } catch (error) {
      alert(error);
    }
  }
  //#endregion

  //#region api calls
  async function fetchMessages() {
    const _messages = await ChatService.fetchMessages(conversationId);
    setMessages(_messages);
  }
  //#endregion

  //#region fetch messages

  useEffect(() => {
    fetchMessages();
  }, [conversationId]);

  useEffect(() => {
    socket.on("user_join", (data) => {
      console.log(data);
    });
    return () => {
      socket.off("user_join");
    };
  }, []);
  useEffect(() => {
    socket.on("new_message", (data) => {
      console.log(data);
      setMessages((prev) => [...prev, data]);
    });
    return () => {
      socket.off("new_message");
    };
  }, []);

  //#endregion

  return { messages, submitHandler, message, handleMessageChange };
};

export default useContainer;
