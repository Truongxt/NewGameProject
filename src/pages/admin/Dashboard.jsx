import React, { useEffect, useState } from "react";
import { Modal, Input, Button, Form } from "antd";
import { addGameKey, getGames } from "../../api/api";

function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [games, setGames] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = games.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(games.length / rowsPerPage);

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

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

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const data = await getGames();
        setGames(data);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };

    fetchGames();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {/* Modal Thêm Key Game */}
      <Button type="primary" onClick={() => setIsModalOpen(true)} className="mt-4">
        Thêm Key Game
      </Button>
      <Modal
        title="Thêm Key Game"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleAddGameKey} layout="vertical">
          <Form.Item
            name="gameId"
            label="ID Game"
            rules={[{ required: true, message: "Vui lòng nhập ID game" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="newKey"
            label="Key Game"
            rules={[{ required: true, message: "Vui lòng nhập key game" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Thêm
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <table id="myTable" className="display" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>TITLE</th>
            <th>GENRE</th>
            <th>DEVELOPER</th>
            <th>RELEASE_DATE</th>
            <th>PRICE</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((row, index) => (
            <tr key={index}>
              <td>{row.id}</td>
              <td>

                <div style={{ display: "flex", alignItems: "center" }}>
                  <img src={row.img} alt="" style={{ width: 50, marginRight: 10 }} />
                  <h3>{row.title}</h3>
                </div>
              </td>
              <td>{row.genre}</td>
              <td>{row.developer}</td>
              <td>{row.release_date}</td>
              <td>{row.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination ngoài table */}
      <div
        className="pagination"
        style={{
          textAlign: "left",
          marginTop: "10px",
          display: "flex",
          justifyContent: "flex-end",
          flexWrap: "wrap",
        }}
      >
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageClick(index + 1)}
            style={{
              marginRight: 5,
              marginBottom: 5,
              padding: "5px 10px",
              backgroundColor: currentPage === index + 1 ? "#007BFF" : "#f0f0f0",
              color: currentPage === index + 1 ? "#fff" : "#000",
              border: "none",
              borderRadius: 4,
              cursor: "pointer",
            }}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
