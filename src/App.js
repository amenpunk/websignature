import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router } from "react-router-dom";
import { initializeApp } from 'firebase/app';


import Container from './components/container';
import { Header } from './components/Header'

const firebaseConfig = {
    apiKey: "AIzaSyBlbF796CnVCBnZSAjcSTlzMrJnaPTZmhg",
    authDomain: "api-tester-dd087.firebaseapp.com",
    databaseURL: "https://api-tester-dd087.firebaseio.com",
    projectId: "api-tester-dd087",
    storageBucket: "api-tester-dd087.appspot.com",
    messagingSenderId: "1081588619626",
    appId: "1:1081588619626:web:4f8063c2085ce2e35bad13",
    measurementId: "G-S37X0MGZJL"
};

initializeApp(firebaseConfig);

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
