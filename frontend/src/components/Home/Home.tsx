
import { useState } from "react";
import "./Home.scss";

export default function Home({ outfit, getOutfit, temp, desc, feelsLike, loading }) {
 const [city, setCity] = useState('')

 return (
  <div className='home-main-container'>
   <input
    type="text"
    placeholder="Enter City Name"
    value={city}
    onChange={(e) => setCity(e.target.value)}
   />
   <button onClick={() => getOutfit(city)} disabled={loading}>
    {loading ? "Loading..." : "Find My Fit"}
   </button>
   <div className='weather-info-container'>
    <p>Temperature: {temp}&deg;F</p>
    <p>Feels Like: {feelsLike}&deg;F</p>
    <p>Description: {desc}</p>
   </div>
   <p className='outfit-response'>{outfit}</p>
  </div>
 )
}