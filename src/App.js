import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import Login from './Pages/Login';

import './App.css';
import ViewBills from './Components/ViewBills';
import ViewStatus from './Components/ViewStatus';
import SubmitClaim from './Components/SubmitClaim';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/profile/:memberId/viewBills" element={<ViewBills />} />
        <Route path="/profile/:memberId/getClaimStatus" element={<ViewStatus />} />
        <Route path="/profile/:memberId/submitClaim" element={<SubmitClaim />} />
      </Routes>
    </Router>
  );
}

export default App;
