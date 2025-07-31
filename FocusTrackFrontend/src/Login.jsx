import './Login.css';
import { FaUserCircle, FaKey } from 'react-icons/fa';

export default function Login() {
  return (
    <div className="login-container">

      <div className="login-card">
        <div>
            <h1 className="login-title">FocusTrack</h1>
            <p className="login-subtitle">Your time under control</p>
        </div>
        <form>
          <label htmlFor="email" className="login-label">Email address</label>
          <div className="login-input-wrapper">
            <input id="email" type="email" className="login-input" />
            <FaUserCircle className="login-icon" />
          </div>

          <label htmlFor="password" className="login-label">Password</label>
          <div className="login-input-wrapper">
            <input id="password" type="password" className="login-input" />
            <FaKey className="login-icon" />
          </div>

          <button type="submit" className="login-button">Log in</button>
        </form>

        <div className="login-footer">
          <button className="create-button">Create a new user</button>
        </div>
      </div>
    </div>
  );
}
