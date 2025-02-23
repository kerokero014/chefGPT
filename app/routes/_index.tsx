import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { Button, Typography, Space, Card, Row, Col } from "antd";

export const meta: MetaFunction = () => {
  return [
    { title: "ChefGPT" },
    {
      name: "Senior Project - Recipe and Meal Management System using OpenAI",
      content: "Welcome to ChefGPT",
    },
  ];
};

export default function Index() {
  return (
    <Row justify="center" align="middle" style={{ minHeight: "100vh", padding: "0 16px" }}>
      <Col xs={24} sm={20} md={16} lg={12} xl={8} style={{ textAlign: "center" }}>
        <Card style={{ padding: 24 }}>
          <Typography.Title level={2}>Welcome to ChefGPT</Typography.Title>
          <Typography.Text>
            Your AI-powered recipe and meal management system. <br />
            Discover, create, and manage your meals effortlessly.
          </Typography.Text>

          <Space style={{ marginTop: 24 }} size="large">
            <Button type="primary" size="large" shape="round">
              <Link to="/login">Login</Link>
            </Button>
            <Button size="large" shape="round">
              <Link to="/register">Register</Link>
            </Button>
          </Space>
        </Card>
      </Col>
    </Row>
  );
}
