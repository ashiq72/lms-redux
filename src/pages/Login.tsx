import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser, type TUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PHForm from "../components/form/PHForm";
import PHInupt from "../components/form/PHInupt";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // const { register, handleSubmit } = useForm<{
  //   id: string;
  //   password: string;
  // }>();
  const [login] = useLoginMutation();

  const onSubmit = async (data: { id: string; password: string }) => {
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
    <PHForm onSubmit={onSubmit}>
      <div>Login Page</div>
      <div>
        <PHInupt type="text" name="id" label="Id" />
      </div>
      <div>
        <PHInupt type="password" name="password" label="Password" />
      </div>
      <button type="submit">Login</button>
    </PHForm>
  );
}
