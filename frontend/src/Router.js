import {
  Route,
  Routes
} from "react-router-dom";

import Home from "./components/Home/Home.tsx";

function Router({ outfit, getOutfit }) {
  return (
    <Routes>
      <Route
        exact
        path="/"
        element={<Home outfit={outfit} getOutfit={getOutfit} />}
      />
    </Routes>

  )
}

export default Router;