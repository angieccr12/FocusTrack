import './RecoverPassword.css';
import { FaEnvelope } from 'react-icons/fa';

export default function RecoverPassword() {
  return (
    <div className="recover-container">
      <div className="recover-card">
        <h2 className="recover-title">Recover Password</h2>
        <p className="recover-subtitle">Enter your email address to receive your password.</p>

        <form>
          <label htmlFor="email" className="recover-label">Email address</label>
          <div className="recover-input-wrapper">
            <input type="email" id="email" className="recover-input" required />
            <FaEnvelope className="recover-icon" />
          </div>

          <button type="submit" className="recover-button">Send</button>
        </form>
      </div>
    </div>
  );
}