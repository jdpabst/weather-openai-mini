import {
  Route,
  Routes
} from "react-router-dom";

import Home from "./components/Home/Home.tsx";

function Router({ outfit, getOutfit, temp, feelsLike, desc, loading }) {
  return (
    <Routes>
      <Route
        exact
        path="/"
        element={<Home outfit={outfit} getOutfit={getOutfit} temp={temp} feelsLike={feelsLike} desc={desc} loading={loading} />}
      />
    </Routes>

  )
}

export default Router;