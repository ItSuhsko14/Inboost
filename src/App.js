import logo from './logo.svg';
import './App.css';
import Toolbar from './components/Toolbar/Toolbar';
import Sidebar from './components/Sidebar/Sidebar';
import MainBlock from './components/MainBlock/MainBlock';

function App() {
  return (
    <div>
      <Toolbar />
      <Sidebar />
      <MainBlock />
    </div>
  );
}

export default App;
