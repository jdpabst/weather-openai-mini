import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import Router from './Router';
import Header from './components/Header/Header';

function App() {
  const [outfit, setOutfit] = useState(null)

  useEffect(() => {
    exampleApiCall();
    // getOutfit();
  }, [])

  // example of talking to the api
  async function exampleApiCall() {
    const result = await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/health`)
    console.log(result)
  }

  async function getOutfit(city) {
    // const location = "Logan"
    const result = await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/weather/${city}`)
    setOutfit(result.data.outfit)
  }


  return (
    <div className="App">
      <Header />
      <Router outfit={outfit} getOutfit={getOutfit} />
    </div>
  );
}

export default App;
