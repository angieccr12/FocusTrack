import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import Dashboard from './components/Dashboard/Dashboard';
import NewActivityRecord from './components/NewActivityRecord/NewActivityRecord';
import RecoverPassword from './components/RecoverPassword/RecoverPassword';

function App() {
  const user = localStorage.getItem('user');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        {/* <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/" />} /> */}
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/new-activity" element={user ? <NewActivityRecord /> : <Navigate to="/" />} /> */}
        <Route path="/new-activity" element={ <NewActivityRecord />} />
        <Route path="/recover-password" element={<RecoverPassword />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
