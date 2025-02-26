import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { Button, Typography, Space, Card, Row, Col } from "antd";
import { getUserSession } from "../utils/auth.server";

export const meta: MetaFunction = () => {
  return [
    { title: "ChefGPT" },
    {
      name: "description",
      content:
        "Senior Project - Recipe and Meal Management System using OpenAI",
    },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserSession(request);
  if (userId) {
    return redirect("/dashboard");
  }
  return json({});
};

export default function Index() {
  useLoaderData();

  return (
    <Row
      justify="center"
      align="middle"
      style={{
        minHeight: "100vh",
        padding: "0 16px",
        backgroundColor: "#f0f2f5",
      }}
    >
      <Col
        xs={24}
        sm={20}
        md={16}
        lg={12}
        xl={8}
        style={{ textAlign: "center" }}
      >
        <Card
          style={{
            padding: 24,
            borderRadius: 12,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography.Title level={2} style={{ color: "#1890ff" }}>
            Welcome to ChefGPT
          </Typography.Title>
          <Typography.Text style={{ fontSize: "16px", color: "#595959" }}>
            Your AI-powered recipe and meal management system. <br />
            Discover, create, and manage your meals effortlessly.
          </Typography.Text>

          <Space style={{ marginTop: 24 }} size="large">
            <Button type="primary" size="large" shape="round">
              <Link to="/login" style={{ color: "#fff" }}>
                Login
              </Link>
            </Button>
            <Button size="large" shape="round">
              <Link to="/register" style={{ color: "#1890ff" }}>
                Register
              </Link>
            </Button>
          </Space>
        </Card>
      </Col>
    </Row>
  );
}
