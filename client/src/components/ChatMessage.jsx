import { OpenAIOutlined } from "@ant-design/icons"

function ChatMessage({ chat }) {
    return (
        <div className={`message ${chat.role === "model" ? "bot" : "user"}-message`} >
            {chat.role === "model" && <OpenAIOutlined height={6} width={6} />}
            <p className="message-text">{chat.text}</p>

        </div >
    )
}

export default ChatMessage
