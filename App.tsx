import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';

// Placeholder for the main terminal page
const TerminalPage = () => (
  <div className="min-h-screen bg-[#03030b] text-white flex items-center justify-center">
    <h1 className="text-4xl font-black uppercase tracking-[0.5em]">
      EliteSignal <span className="text-[#39FF14]">Terminal</span>
    </h1>
  </div>
);
const basename = import.meta.env.BASE_URL;

function App() {
  return (
    <Router basename={basename}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/terminal" element={<TerminalPage />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
