import Conversation from "./components/Conversation/Conversation";
import useContainer from "./useContainer";

const Chat = () => {
  const { conversations, handleSelectConversation, selectedConversation } =
    useContainer();

  return (
    <div className="w-full flex min-h-screen">
      <div className="flex flex-col w-[200px] gap-y-4">
        {conversations.map((conversation: Conversation) => (
          <div key={conversation._id} className="border-y border-black py-4 ">
            <p
              className="cursor-pointer"
              onClick={() => handleSelectConversation(conversation)}
            >
              {conversation.name}
            </p>
          </div>
        ))}
      </div>
      <div className="flex flex-col flex-1 ">
        {!selectedConversation && <p>Please select a conversation first.</p>}
        {selectedConversation && (
          <Conversation conversation={selectedConversation} />
        )}
      </div>
    </div>
  );
};

export default Chat;
