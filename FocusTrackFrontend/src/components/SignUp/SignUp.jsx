import axios from 'axios';
import './SignUp.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
export default function SignUp() {
  
  const navigate = useNavigate();
  const [userEmail,setUserEmail] = useState('');
  const [userPassword,setUserPassword] = useState('');
  const [userEmailConfirmation,setUserEmailConfirmation] = useState('');
  const [userPasswordConfirmation,setUserPasswordConfirmation] = useState('');

  const submit=async(event)=>{
    event.preventDefault();
    if(!userEmail || !userPassword || !userEmailConfirmation || !userPasswordConfirmation){
      toast.error('All fields are required');
    }else{ 
      await createUser();
    }
  }
  const createUser=async()=>{
    try{
      const response = await axios.post('http://localhost:3001/api/signup', {
        email: userEmail,
        emailConfirmation: userEmailConfirmation,
        password: userPassword,
        passwordConfirmation: userPasswordConfirmation
      
      })
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
          <input type="email" placeholder="Email address" className="signup-input full" value={userEmail} onChange={(e) => setUserEmail(e.target.value)}/>
          <input type="email" placeholder="Repeat email address" className="signup-input full" value={userEmailConfirmation} onChange={(e) => setUserEmailConfirmation(e.target.value)}/>
          <input type="password" placeholder="New password" className="signup-input full" value={userPassword} onChange={(e) => setUserPassword(e.target.value)}/>
          <input type="password" placeholder="Repeat password" className="signup-input full" value={userPasswordConfirmation} onChange={(e) => setUserPasswordConfirmation(e.target.value)}/>

          <button type="submit" className="signup-button">Sign Up</button>
        </form>
      </div>
    </div>
  );
}
