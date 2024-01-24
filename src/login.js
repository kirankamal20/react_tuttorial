// Assuming you're using functional components
import React, { useState } from 'react';
import "./App.css";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import axios from 'axios'
import API_URL from './const/api_url';
function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState(false)
  const [stateO, setStateO] = useState(false)
  const [stateG, setStateG] = useState(false)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  };

  function login() {
    setLoading(true);

    axios.post( API_URL+'/login', {
      email: formData.username,
      password: formData.password,
    })
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
          var data = response.data;
          console.log(data.detail.token)
          const token = data.detail.token;
          Cookies.set('token', token, { expires: 7, secure: true });

          navigate('/home');
        } else {
          setLoading(false);
        }

      })
      .catch(function (error) {setLoading(false);
        alert( error.message );
        console.log(error);

      });

  }
  return (
    <div className="login-container" style={{
      backgroundImage: 'url(images/background.jpg)',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',

    }} >
      <form className="login-form" onSubmit={handleSubmit}>
        <h1 className="login-heading">Login</h1>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            className="form-control"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
          <label htmlFor="password" className='passwordlabel'>
            Password
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Logging in...' : 'Submit'}
          </button>
          <div>

          </div>
        </div>
      </form>

    </div>
  );
}

export default Login;
