import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser, type TUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";

import { Button, Card, Col, Row, Typography } from "antd";
import type { FieldValues } from "react-hook-form";

const { Title, Text } = Typography;

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const defaultValues = { id: "A-0001", password: "ami123" };
  const [login, { isLoading }] = useLoginMutation();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Logging in...");

    try {
      const userInfo = { id: data.id, password: data.password };
      const res = await login(userInfo).unwrap();

      const user = verifyToken(res.data.accessToken) as unknown as TUser;

      dispatch(setUser({ user, token: res.data.accessToken }));
      navigate(`/${user.role.toLowerCase()}/dashboard`);

      toast.success("Login successful!", { id: toastId, duration: 2000 });
    } catch (error: unknown) {
      const errorMessage =
        (error as { data?: { message?: string } })?.data?.message ||
        "Login failed. Please check your credentials.";
      toast.error(errorMessage, { id: toastId });
    }
  };

  return (
    <Row
      justify="center"
      align="middle"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f0f5ff, #ffffff)",
      }}
    >
      <Col xs={22} sm={16} md={10} lg={8} xl={6}>
        <Card
          bordered={false}
          style={{
            borderRadius: 12,
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          }}
        >
          <Title level={3} style={{ textAlign: "center", marginBottom: 4 }}>
            Welcome Back 👋
          </Title>
          <Text
            type="secondary"
            style={{ display: "block", textAlign: "center", marginBottom: 24 }}
          >
            Please login to your account
          </Text>

          <PHForm onSubmit={onSubmit} defaultValues={defaultValues}>
            <PHInput type="text" name="id" label="User ID" />

            <PHInput type="password" name="password" label="Password" />

            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              loading={isLoading}
              style={{ marginTop: 12 }}
            >
              Login
            </Button>
          </PHForm>
        </Card>
      </Col>
    </Row>
  );
}
