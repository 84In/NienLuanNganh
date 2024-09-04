import { Route, Routes } from "react-router-dom";
import { Home, Login } from "./containers/Public";
import { path } from "./utils/constant";

function App() {
  return (
    <div className="bg-gray-200">
      <Routes>
        <Route path={path.HOME} element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
