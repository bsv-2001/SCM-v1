import { EthProvider } from "./contexts/EthContext";
import NavComponent from './components/NavComponent/NavComponent'
import Admin from './components/LoginComponent/Admin'
import Dis from './components/LoginComponent/Dis'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import "./App.css";
function App() {
  return (
    <Router>
      <EthProvider>
        <div id="App" >
          <NavComponent></NavComponent>
          <Routes>
            <Route path="adminNode" element={<Admin />} />
            <Route path="disNode" element={<Dis />} />
          </Routes>
        </div>
      </EthProvider>
    </Router>
    
  );
}

export default App;


