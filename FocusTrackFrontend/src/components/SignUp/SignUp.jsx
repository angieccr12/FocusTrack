import axios from 'axios';
import './SignUp.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function SignUp() {
  const navigate = useNavigate();

  const [formUserData, setFormUserData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    emailConfirmation: '',
    password: '',
    passwordConfirmation: ''
  });

  const handleInputChange = (field, value) => {
    setFormUserData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const submit = async (event) => {
    event.preventDefault();

    const {
      first_name,
      last_name,
      email,
      emailConfirmation,
      password,
      passwordConfirmation
    } = formUserData;

    // Validaciones básicas
    if (!first_name || !last_name || !email || !emailConfirmation || !password || !passwordConfirmation) {
      return toast.error('All fields are required');
    }

    if (email !== emailConfirmation) {
      return toast.error('Emails do not match');
    }

    if (password !== passwordConfirmation) {
      return toast.error('Passwords do not match');
    }

    try {
      const response = await axios.post('http://localhost:3000/api/auth/register', {
        first_name,
        last_name,
        email,
        password
      });

      toast.success('User created successfully');
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/dashboard');

    } catch (error) {
      const message = error?.response?.data?.message ?? 'Error signing up';
      toast.error(message);

      // Si el correo ya está registrado, redirigir a login
      if (message.includes('already registered')) {
        navigate('/login');
      }
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-title">FocusTrack</div>

      <div className="signup-card">
        <h2 className="signup-heading">Create an account</h2>
        <p className="signup-subheading">It's quick and easy.</p>
        <hr className="signup-divider" />

        <form className="signup-form" onSubmit={submit}>
          <div className="signup-row">
            <input
              type="text"
              placeholder="Name"
              className="signup-input"
              value={formUserData.first_name}
              onChange={(e) => handleInputChange('first_name', e.target.value)}
            />
            <input
              type="text"
              placeholder="Last name"
              className="signup-input"
              value={formUserData.last_name}
              onChange={(e) => handleInputChange('last_name', e.target.value)}
            />
          </div>

          <input
            type="email"
            placeholder="Email address"
            className="signup-input full"
            value={formUserData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
          />
          <input
            type="email"
            placeholder="Repeat email address"
            className="signup-input full"
            value={formUserData.emailConfirmation}
            onChange={(e) => handleInputChange('emailConfirmation', e.target.value)}
          />
          <input
            type="password"
            placeholder="New password"
            className="signup-input full"
            value={formUserData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
          />
          <input
            type="password"
            placeholder="Repeat password"
            className="signup-input full"
            value={formUserData.passwordConfirmation}
            onChange={(e) => handleInputChange('passwordConfirmation', e.target.value)}
          />

          <button type="submit" className="signup-button">Sign Up</button>
        </form>
      </div>
    </div>
  );
}
