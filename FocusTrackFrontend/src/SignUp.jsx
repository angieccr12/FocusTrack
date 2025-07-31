import './SignUp.css';

export default function SignUp() {
  return (
    <div className="signup-container">
      <div className="signup-title">FocusTrack</div>

      <div className="signup-card">
        <h2 className="signup-heading">Create an account</h2>
        <p className="signup-subheading">It's quick and easy.</p>
        <hr className="signup-divider" />

        <form className="signup-form">
          <div className="signup-row">
            <input type="text" placeholder="Name" className="signup-input" />
            <input type="text" placeholder="Last name" className="signup-input" />
          </div>
          <input type="email" placeholder="Email address" className="signup-input full" />
          <input type="email" placeholder="Repeat email address" className="signup-input full" />
          <input type="password" placeholder="New password" className="signup-input full" />
          <input type="password" placeholder="Repeat password" className="signup-input full" />

          <button type="submit" className="signup-button">Sign Up</button>
        </form>
      </div>
    </div>
  );
}
