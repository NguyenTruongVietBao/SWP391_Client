import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import api from "../../config/axios";
import { login } from "../../redux/features/counterSlice";

export default function LoginStudent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("api/login/student", {
        password: password,
        username: username,
      });
      console.log(response.data.data);
      localStorage.setItem("token", response.data.data.token);
      const role = response.data.data.role; //get role
      dispatch(login(response.data.data));
      if (role === "STUDENT") {
        navigate("/learning");
      }
    } catch (e) {
      console.log(e);
      setError('Sai tên đăng nhập hoặc mật khẩu');
    }
  };
  console.log(username, password)
  return (
    <header
      className=" bg-cover h-screen"
      style={{ backgroundImage: 'url("/assets/wallpaper-login-student.png")' }}
    >
      <div className="content px-8 py-2">
        <div className="body mt-28 mx-8">
          <div className="md:flex items-center justify-center">
            <div className="w-full md:max-w-md mt-6">
              <div className="card bg-white/5 p-6 backdrop-blur-2xl shadow-2xl rounded-lg px-4 py-4 mb-6">
                <form>
                  <div className="flex items-center justify-center mb-5">
                    <h2 className="text-4xl font-bold tracking-wide my-5 text-mathcha-green">
                      Đăng nhập
                    </h2>
                  </div>
                  <input
                    type="text"
                    className="rounded px-4 w-full py-3 bg-gray-50 border border-gray-400 mb-6 text-gray-700 placeholder-gray-700 focus:bg-white focus:outline-none"
                    placeholder="Tên đăng nhập"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <input
                    type="password"
                    className="rounded px-4 w-full py-3 bg-gray-50 border border-gray-400 mb-4 text-gray-700 placeholder-gray-700 focus:bg-white focus:outline-none"
                    placeholder="Mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {error && <div className="text-red-500 mb-4">{error}</div>}
                  <div className="flex items-center justify-evenly gap-28 py-3">
                    <a href="/" className="text-gray-600">Quên mật khẩu ?</a>
                    <button
                      onClick={handleLogin}
                      className="bg-mathcha-green text-white font-bold px-4 py-3 rounded"
                      type='submit'
                    >
                      Đăng nhập
                    </button>
                  </div>
                </form>
              </div>
              <div className="flex items-center justify-center">
                <Link to={'/login'} className='bg-sky-300 text-xl font-bold px-16 py-1 rounded-lg text-gray-800 hover:bg-mathcha'>
                  Trang bố mẹ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
