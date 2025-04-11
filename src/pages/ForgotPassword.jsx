import { Container, Form, Button, Row, Col } from "react-bootstrap";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-50">
      <Container className="bg-white p-4 rounded shadow-lg position-relative" style={{ maxWidth: "900px" }}>
        <button className="btn position-absolute top-0 end-0 m-2" onClick={() => navigate("/")}> 
          <AiOutlineClose size={24} />
        </button>
        <Row className="align-items-center">
          <Col md={6} className="p-3">
            <h2 className="fw-bold mb-3 fs-4">Đặt lại mật khẩu</h2>
            <p className="text-muted mb-4">Vui lòng hoàn tất các thông tin xác thực bên dưới để đặt lại mật khẩu cho tài khoản của bạn.</p>
            <Form>
              <Form.Group className="mb-4 floating-label-group">
                <Form.Control
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <label className={email ? "active" : ""}>Email hoặc tên đăng nhập</label>
              </Form.Group>
              
              <Form.Group className="mb-3 floating-label-group">
                <Form.Control
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <label className={newPassword ? "active" : ""}>Mật khẩu mới</label>
              </Form.Group>

              <Form.Group className="mb-3 floating-label-group">
                <Form.Control
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <label className={confirmPassword ? "active" : ""}>Nhập lại mật khẩu mới</label>
              </Form.Group>

              <Button variant="primary" className="w-100" type="submit">Đặt lại mật khẩu</Button>
            </Form>
            
            <p className="mt-3">
              <Link to="/login" className="text-primary text-decoration-none">Quay lại trang đăng nhập</Link>
            </p>
          </Col>
          <Col md={6} className="d-flex justify-content-center">
            <img 
              src="https://cdn.divineshop.vn/static/c92dc142033ca6a66cda62bc0aec491b.svg" 
              alt="Illustration" 
              className="img-fluid"
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ForgotPassword;
