
import { useState } from "react";
import "./Home.scss";

export default function Home({ outfit, getOutfit }) {
 const [city, setCity] = useState('')

 return (
  <div className='home-main-container'>
   <input
    type="text"
    placeholder="Enter Location"
    value={city}
    onChange={(e) => setCity(e.target.value)}
   />
   <button onClick={() => getOutfit(city)}> Generate Outfit </button>
   <p>{outfit}</p>
  </div>
 )
}