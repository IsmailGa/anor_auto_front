import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./adminLogin.css";

function AdminLogin({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleLogin = async (e) => {
    setError("")
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:6060/api/admins/login", {
        username,
        password
      });
      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
      navigate("/admin/panel");
    } catch (err) {
      console.log(err.message);
      setError("Неверные учетные данные");
    }
  };

  return (
    <div className="admin_login">
      <div className="container">
        <div className="admin_content">
          <h2>Admin Login</h2>
          <form onSubmit={handleLogin}>
            <div>
              <label className="custom-field one">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder=" "
                />
                <span class="placeholder">Имя пользователя</span>
              </label>
            </div>
            <div>
              <label className="custom-field one">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder=" "
                />
                <span class="placeholder">Пароль</span>
              </label>
            </div>
            {error && <p className="error_msg">{error}</p>}
            <button type="submit">Войти</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
