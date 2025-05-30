import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";
import API_URL from "../config";
import { useState } from "react";
import { useAuth } from "../Context/Authprovider";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();


  const onSubmit = async(data) => {
    try {
      setLoading(true);
      console.log("Attempting login with:", data);
      const userInfo = {
        email: data.email,
        password: data.password
      };
      
      const res = await axios.post(`${API_URL}/user/login`, userInfo);
      
      if(res.data) {
        toast.success("Login Successfully");
        
        // Lưu thông tin user vào context và localStorage
        setAuth({
          ...auth,
          user: res.data.user
        });
        
        localStorage.setItem("User", JSON.stringify(res.data.user));
        
        console.log("User role:", res.data.user.role);
        
        // Kiểm tra nếu là admin thì redirect đến trang admin
        if(res.data.user.role && res.data.user.role.toLowerCase() === 'admin') {
          console.log("Redirecting to admin page");
          navigate('/admin');
        } else {
          console.log("Redirecting to home page");
          navigate('/');
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      if(error.response) {
        toast.error("Error: " + error.response.data.message);
      } else {
        toast.error("Error: Network or server issue");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex h-screen items-center justify-center bg-slate-800 text-white">
        <div className="w-[400px] md:w-[600px]">
          <div className="modal-box bg-slate-900 text-white">
            <form method="dialog" onSubmit={handleSubmit(onSubmit)}>
              <Link to={'/'} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</Link>
              <h3 className="font-bold text-lg">Login</h3>
              <div className="m-4">
                <span>Email</span>
                <br />
                <input
                  type="email"
                  placeholder="Enter your email here"
                  className="w-50 md:w-80 px-3 py-1 mt-2 border rounded-md outline-none bg-slate-900 text-white"
                  {...register("email", { required: true })}
                />
                <br />
                {errors.email && <span className="text-sm text-red-500">Email is required</span>}
              </div>
              <div className="m-4">
                <span>Password</span>
                <br />
                <input
                  type="password"
                  placeholder="Enter your password here"
                  className="w-50 md:w-80 px-3 py-1 mt-2 border rounded-md outline-none bg-slate-900 text-white"
                  {...register("password", { required: true })}
                />
                <br />
                {errors.password && <span className="text-sm text-red-500">Password is required</span>}
              </div>
              <div className="flex justify-around m-2 mt-6">
                <button
                  className={`bg-pink-500 text-white rounded-md px-3 py-2 hover:bg-pink-700 duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Login'}
                </button>
                <p className="mt-1">
                  Not Registered ?{" "}
                  <Link to={"/signup"}
                    className="text-pink-500 font-semibold underline cursor-pointer hover:text-pink-700 duration-200">
                    Signup
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
};

export default Login;
