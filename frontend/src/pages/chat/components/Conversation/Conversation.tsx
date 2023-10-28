import useContainer from "./useContainer";

interface IConversationProps {
  conversation: Conversation;
}

const Conversation = ({ conversation }: IConversationProps) => {
  const { messages, submitHandler, message, handleMessageChange } =
    useContainer({ conversationId: conversation._id });
  return (
    <div className="px-4 flex flex-col min-h-full">
      <h1>{conversation.name}</h1>
      <div className="flex flex-col flex-1">
        {messages.length === 0 && <p>Empty message</p>}
        {messages.map((message) => (
          <p key={message._id}>
            {message.senderId} ========= {message.content}
          </p>
        ))}
      </div>
      <div className="flex">
        <form
          method="POST"
          onSubmit={(e) => {
            e.preventDefault();
            submitHandler();
          }}
        >
          <input
            value={message}
            onChange={(e) => handleMessageChange(e.target.value)}
            type="text"
            placeholder="Enter message"
            className="border"
          />
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Conversation;
