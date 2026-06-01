import Home from './components/Home';
import { AppProvider } from './context/AppContext';
import './App.css';

function App() {
  return (
    <AppProvider>
      <Home />
    </AppProvider>
  );
}

export default App;
