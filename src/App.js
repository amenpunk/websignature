import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router } from "react-router-dom";

import Container from './components/container';
import { Header } from './components/Header'

function App() {
  return (
      <Router className="App">
          <Container>
              <Header/>
          </Container>
      </Router>
  );
}

export default App;
