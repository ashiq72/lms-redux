import { useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser, type TUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm<{
    id: string;
    password: string;
  }>();
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>Login Page</div>
      <div>
        <label htmlFor="id">Id:</label>
        <input type="text" id="id" {...register("id")} />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" {...register("password")} />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}
