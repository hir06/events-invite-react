import './styles/index.scss'
import './App.scss';
import Header from './components/Header/Header'
import AppRoutes from './routes';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header className="header" appName="Partners Events" />
        <div className="main">
          <AppRoutes />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
