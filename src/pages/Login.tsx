import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser, type TUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PHForm from "../components/form/PHForm";
import PHInupt from "../components/form/PHInupt";
import { Row } from "antd";
import type { FieldValues } from "react-hook-form";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const defaultValues = { id: "2025010001", password: "ami123" };
  const [login] = useLoginMutation();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Logging in...");
    try {
      const userInfo = { id: data.id, password: data.password };
      const res = await login(userInfo).unwrap();

      const user = verifyToken(res.data.accessToken) as unknown as TUser;

      dispatch(setUser({ user: user, token: res.data.accessToken }));
      navigate(`/${user.role.toLowerCase()}/dashboard`);
      toast.success("Login successful!", { id: toastId, duration: 2000 });
    } catch {
      toast.error("Login failed. Please check your credentials.");
    }
  };
  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <PHForm onSubmit={onSubmit} defaultValues={defaultValues}>
        <div>Login Page</div>

        <PHInupt type="text" name="id" label="Id" />

        <PHInupt type="password" name="password" label="Password" />

        <button type="submit">Login</button>
      </PHForm>
    </Row>
  );
}
