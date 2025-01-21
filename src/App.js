import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import SignupPage from './pages/signupForms/Signup';
import LoginPage from './pages/signupForms/Login';
import BudgetPage from './pages/BudgetPage';
import TransactionPage from './pages/TransactionPage';
import Dashboard from './pages/dashboard';
import Settings from './pages/Settings';
import Reports from './pages/Reports';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas);
function App() {
  return (
    <>
     
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<LoginPage/>} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/signup" element={<SignupPage/>} />
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/budget" element={<BudgetPage/>} />
            <Route path="/transactions" element={<TransactionPage/>} />
            <Route path="/reports" element={<Reports/>} />
            <Route path="/settings" element={<Settings/>} />
        </Routes>
      </BrowserRouter>
      
  </>
  );
}

export default App;