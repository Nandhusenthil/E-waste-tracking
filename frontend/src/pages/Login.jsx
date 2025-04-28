// frontend/pages/Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true); // true -> login, false -> signup
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('municipal'); // only used during signup
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        // Login API
        const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
        const { token, role } = res.data;

        localStorage.setItem('token', token);
        localStorage.setItem('role', role);

        // Navigate based on role
        if (role === 'municipal') navigate('/municipalitydashboard');
        else if (role === 'recycler') navigate('/recyclerdashboard');
        else if (role === 'central-government') navigate('/landingpage'); // fallback page
      } else {
        // Signup API
        await axios.post('http://localhost:5000/api/auth/signup', { email, password, role });
        alert('Signup successful! Please login now.');
        setIsLogin(true); // After signup, switch to login mode
      }
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2>{isLogin ? 'Login' : 'Signup'}</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        {!isLogin && (
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            style={styles.input}
          >
            <option value="municipal">Municipal</option>
            <option value="recycler">Recycler</option>
            <option value="central-government">Central Government</option>
          </select>
        )}
        <button type="submit" style={styles.button}>
          {isLogin ? 'Login' : 'Signup'}
        </button>
        <p style={styles.toggle}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span onClick={() => setIsLogin(!isLogin)} style={styles.link}>
            {isLogin ? ' Signup' : ' Login'}
          </span>
        </p>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f0f0f0'
  },
  form: {
    background: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.1)', width: '300px'
  },
  input: {
    display: 'block', width: '100%', padding: '10px', margin: '10px 0', borderRadius: '4px', border: '1px solid #ccc'
  },
  button: {
    width: '100%', padding: '10px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'
  },
  toggle: {
    marginTop: '15px', textAlign: 'center'
  },
  link: {
    color: '#007bff', cursor: 'pointer', marginLeft: '5px'
  }
};

export default Login;
