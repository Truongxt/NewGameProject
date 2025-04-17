import React, { useState } from "react";
import { Modal, Input, Button, Form } from "antd";
import { addGameKey } from "../../api/api";

function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const handleAddGameKey = async (values) => {
    try {
      const { gameId, newKey } = values;
      const response = await addGameKey(gameId, newKey);
      if (response.message) {
        alert("Thêm key game thành công!");
        setIsModalOpen(false);
        form.resetFields();
      }
    } catch (error) {
      console.error("Error adding game key:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <Button type="primary" onClick={() => setIsModalOpen(true)}>
        Thêm Key Game
      </Button>
      <Modal
        title="Thêm Key Game"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleAddGameKey} layout="vertical">
          <Form.Item name="gameId" label="ID Game" rules={[{ required: true, message: "Vui lòng nhập ID game" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="newKey" label="Key Game" rules={[{ required: true, message: "Vui lòng nhập key game" }]}>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Thêm
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Dashboard;
