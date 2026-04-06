import { useState } from "react";
import "../styles/Signup.css"; // Create this CSS file for styling

interface SignupFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function Signup() {
  const [formData, setFormData] = useState<SignupFormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signup data:", formData);

    // TODO: Connect with backend API for signup
  };

  return (
    <form onSubmit={handleSubmit} className="signup-form">
      <h2>Create Account</h2>

      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />

      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
      />

      <button type="submit">Sign Up</button>
    </form>
  );
}

export default Signup;