import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router } from "react-router-dom";
import { initializeApp } from 'firebase/app';
import { createContext } from 'react'

import Container from './components/container';
import { Header } from './components/Header'
import { Footer } from './components/Foooter'

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

const GATEWAY =  {
    dev : {
        API : 'http://localhost:8000',
        IPFS : 'http://localhost:8080/'
    },
    PRO : {
        API : 'http://143.244.178.41:80',
        IPFS : 'https://ipfs.io'
    }
}

export const API_GATEWAY = createContext(GATEWAY)

function App() {
  return (
      <Router className="App">
          <API_GATEWAY.Provider value={GATEWAY.dev}>
              <Container>
                  <Header/>
                  <Footer/>
              </Container>
          </API_GATEWAY.Provider>
      </Router>
  );
}

export default App;
