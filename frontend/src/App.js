import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import Router from './Router';
import Header from './components/Header/Header';

function App() {
  const [outfit, setOutfit] = useState(null);
  const [temp, setTemp] = useState(null);
  const [feelsLike, setFeelsLike] = useState(null);
  const [desc, setDesc] = useState(null);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);

    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/weather/${city}`
      );

      setOutfit(result.data.outfit);
      setTemp(result.data.temp);
      setFeelsLike(result.data.feels_like);
      setDesc(result.data.description);

    } catch (error) {
      console.error("Error fetching outfit:", error);
    } finally {
      setLoading(false); // ✅ spinner will ALWAYS stop
    }
  }


  return (
    <div className="App">
      <Header />
      <Router outfit={outfit} getOutfit={getOutfit} temp={temp} feelsLike={feelsLike} desc={desc} loading={loading} />
    </div>
  );
}

export default App;
