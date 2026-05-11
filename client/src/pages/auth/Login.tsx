import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);

      console.log("Logged in:", res.data);
      alert("Welcome back to NovaHaven");
      navigate("/forum");
    } catch (err) {
      console.log(err);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="auth-page">
      <h2>Login to NovaHaven</h2>

      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;