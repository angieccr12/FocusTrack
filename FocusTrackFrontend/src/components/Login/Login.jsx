import axios from 'axios';
import { useState } from 'react';
import './Login.css';
import { FaUserCircle, FaKey } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
export default function Login() {
  const navigate = useNavigate(); 
  const [formLoginData, setFormLoginData] = useState({
    email: '',
    password: ''
  })
  
  /**
   * Submit login form
   * 
   * Logs the email and password of the user to the console.
   * 
   * @function
   * @name submit
   */
  const submit=async(event)=>{
    event.preventDefault();
    try{ 
      const response = await axios.post('http://localhost:3000/api/auth/login', formLoginData);
      const message = response?.data?.message??'Session started successfully';
      toast.success(message);
      console.log(response.data);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/dashboard');
    }catch(error){
      const message = error?.response?.data?.message??'Error logging in';
      console.log(error);
      toast.error(message);
    }

  }
  const handleInputChange = (field, value) => {
    setFormLoginData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const signUp=async(event)=>{
    event.preventDefault();
    navigate('/signup');
  }
  return (
    <div className="login-container">
      <div className="login-card">
        <div>
          <h1 className="login-title">FocusTrack</h1>
          <p className="login-subtitle">Your time under control</p>
        </div>
        <form onSubmit={submit}>
          <label htmlFor="email" className="login-label">Email address</label>
          <div className="login-input-wrapper">
            <input id="email" type="email" className="login-input" value={formLoginData.email} onChange={(e)=>handleInputChange('email', e.target.value)} />
            <FaUserCircle className="login-icon" />
          </div>

          <label htmlFor="password" className="login-label">Password</label>
          <div className="login-input-wrapper">
            <input id="password" type="password" className="login-input" value={formLoginData.password} onChange={(e)=>handleInputChange('password', e.target.value)} />
            <FaKey className="login-icon" />
          </div>

          <button type="submit" className="login-button">Log in</button>

          {/* Hipervínculo para recuperar contraseña */}
          <div style={{ textAlign: 'center', marginTop: '10px' }}>
            <a href="/recover-password" className="recover-link">Forgot your password?</a>
          </div>
        </form>

        <div className="login-footer">
          <button className="create-button" typebutton onClick={signUp}>Create a new user</button>
        </div>
      </div>
    </div>
  );
}
