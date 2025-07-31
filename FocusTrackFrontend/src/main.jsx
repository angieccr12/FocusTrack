import './variables.css';
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Login from './Login.jsx' 
import SignUp from './SignUp.jsx' 
import NewActivityRecord from './NewActivityRecord.jsx' 
import Dashboard from './Dashboard.jsx' 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SignUp/>
  </React.StrictMode>,
)
