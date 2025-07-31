import './variables.css';
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Login from './components/Login/Login.jsx' 
import SignUp from './components/SignUp/SignUp.jsx' 
import NewActivityRecord from './components/NewActivityRecord/NewActivityRecord.jsx' 
import Dashboard from './components/Dashboard/Dashboard.jsx' 
import RecoverPassword from './components/RecoverPassword/RecoverPassword.jsx' 
import App from './App.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
)
