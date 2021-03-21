import './App.css';
import { Provider } from 'react-redux'
import store from './components/redux/store';
import NavBar from './components/navbar';
import { BrowserRouter as Router } from 'react-router-dom'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <NavBar></NavBar>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
