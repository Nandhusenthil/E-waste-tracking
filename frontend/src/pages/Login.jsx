// frontend/pages/Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import the CSS file

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('municipal');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
        const { token, role } = res.data;

        localStorage.setItem('token', token);
        localStorage.setItem('role', role);

        if (role === 'municipal') navigate('/municipalitydashboard');
        else if (role === 'recycler') navigate('/recyclerdashboard');
        else if (role === 'central-government') navigate('/dashboard');
      } else {
        await axios.post('http://localhost:5000/api/auth/signup', { email, password, role });
        alert('Signup successful! Please login now.');
        setIsLogin(true);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <h2>{isLogin ? 'Login' : 'Signup'}</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="input"
        />
        {!isLogin && (
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            className="select"
          >
            <option value="municipal">Municipal</option>
            <option value="recycler">Recycler</option>
            <option value="central-government">Government</option>
          </select>
        )}
        <button type="submit" className="button">
          {isLogin ? 'Login' : 'Signup'}
        </button>
        <p className="toggle">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span onClick={() => setIsLogin(!isLogin)} className="link">
            {isLogin ? ' Signup' : ' Login'}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
