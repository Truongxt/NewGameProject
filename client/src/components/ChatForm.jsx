import { ArrowUpOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space } from "antd";

function ChatForm({ setChatHistory, generateResponse, chatHistory }) {
    const [form] = Form.useForm();

    const handleSubmit = (values) => {
        const userMessage = values.message;
        if (!userMessage) return;

        // update chat history
        setChatHistory(history => [...history, { role: "user", text: userMessage }]);


        //update chat bot history
        setTimeout(() => {
            setChatHistory(history => [...history, { role: "model", text: "Think......." }]);

            // call response
            generateResponse([...chatHistory, { role: "user", text: userMessage }]);

        }, 600);

        form.resetFields(); // Reset form sau khi gửi tin nhắn
    };

    return (
        <>
            <Form form={form} className="chat-form" onFinish={handleSubmit}>
                <Space.Compact style={{ width: "100%" }}>
                    <Form.Item name="message" style={{ flex: 1, marginBottom: 0 }}>
                        <Input placeholder="Nhập tin nhắn..." className="message-input" />
                    </Form.Item>
                    <Button type="primary" htmlType="submit">
                        <ArrowUpOutlined />
                    </Button>
                </Space.Compact>
            </Form>
        </>
    );
}

export default ChatForm;
