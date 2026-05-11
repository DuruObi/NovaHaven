import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/register", form);
      console.log("Registered:", res.data);
      alert("Account created successfully. Please log in.");
      navigate("/login");
    } catch (err) {
      console.log(err);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="auth-page">
      <h2>Register NovaHaven Account</h2>

      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" onChange={handleChange} />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} />

        <button type="submit">Create Account</button>
      </form>
    </div>
  );
}

export default Register;