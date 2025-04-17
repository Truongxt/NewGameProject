import { ArrowUpOutlined, OpenAIOutlined } from "@ant-design/icons"
import { Button, Form, Input, Space } from "antd"
import "./ChatBot.css"
import ChatForm from "./ChatForm"
import { useEffect, useRef, useState } from "react";
import ChatMessage from "./ChatMessage";
function ChatBot() {

    const [chatHistory, setChatHistory] = useState([]);

    const chatBodyRef = useRef();

    const generateResponse = async (history) => {
        history = history.map(({ role, text }) => ({ role, parts: [{ text }] }));

        //update chat history
        const updateHistory = (text) => {
            setChatHistory(prev => [...prev.filter(msg => msg.text !== "Think......."), { role: "model", text }]);
        };

        const requestOption = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents: history })
        }

        try {
            const response = await fetch(import.meta.env.VITE_API_URL, requestOption);
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error.message || "Something went wrong!");
            }
            const apiResponseText = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();

            updateHistory(apiResponseText);
        } catch (error) {
            console.error("Lỗi khi gọi API:", error);
        }
    }

    useEffect(() => {
        chatBodyRef.current.scrollTo({ top: chatBodyRef.current.scrollHeight, behavior: "smooth" });
    }, [chatHistory]);

    return (
        <div className="container">
            <div className="chatbot-popup">
                {/* Chat body */}
                <div className="chat-body" ref={chatBodyRef}>
                    <div className="message bot-message">
                        <OpenAIOutlined height={6} width={6} />
                        <p className="message-text">Chào bạn! Mình có thể giúp gì cho bạn?</p>
                    </div>

                    {/* Render chat */}
                    {chatHistory.map((message, index) => (
                        <ChatMessage key={index} chat={message} />
                    ))}


                </div>

                {/* chat footer */}
                <div className="chat-footer">
                    <ChatForm setChatHistory={setChatHistory} generateResponse={generateResponse} chatHistory={chatHistory} />
                </div>
            </div>
        </div>
    )
}

export default ChatBot
