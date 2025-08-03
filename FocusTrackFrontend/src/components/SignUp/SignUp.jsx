import axios from 'axios';
import './SignUp.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
export default function SignUp() {
  
  const navigate = useNavigate();
  const [formUserData, setFormUserData] = useState({
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
  const submit=async(event)=>{
    event.preventDefault();
    if(!formUserData.email || !formUserData.emailConfirmation || !formUserData.password || !formUserData.passwordConfirmation){
      toast.error('All fields are required');
    }else{ 
      await createUser();
    }
  }
  const createUser=async()=>{
    try{
      const response = await axios.post('http://localhost:3001/api/signup', formUserData)
      toast.success('User created successfully');
      navigate('/dashboard');
    }catch(error){
      console.log(error);
      toast.error('Error signing up'+ error.message);
    }
  }
  return (
    <div className="signup-container">
      <div className="signup-title">FocusTrack</div>

      <div className="signup-card">
        <h2 className="signup-heading">Create an account</h2>
        <p className="signup-subheading">It's quick and easy.</p>
        <hr className="signup-divider" />

        <form className="signup-form" onSubmit={submit}>
          {/* <div className="signup-row">
            <input type="text" placeholder="Name" className="signup-input" />
            <input type="text" placeholder="Last name" className="signup-input" />
          </div> */}
          <input type="email" placeholder="Email address" className="signup-input full" value={formUserData.email} onChange={(e) => handleInputChange('email', e.target.value)}/>
          <input type="email" placeholder="Repeat email address" className="signup-input full" value={formUserData.emailConfirmation} onChange={(e) => handleInputChange('emailConfirmation', e.target.value)}/>
          <input type="password" placeholder="New password" className="signup-input full" value={formUserData.password} onChange={(e) => handleInputChange('password', e.target.value)}/>
          <input type="password" placeholder="Repeat password" className="signup-input full" value={formUserData.passwordConfirmation} onChange={(e) => handleInputChange('passwordConfirmation', e.target.value)}/>

          <button type="submit" className="signup-button">Sign Up</button>
        </form>
      </div>
    </div>
  );
}
