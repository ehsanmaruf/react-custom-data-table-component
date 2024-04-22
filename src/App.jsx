import { Route, Routes } from "react-router-dom";
import { routes } from "./route";

function App() {
  return (
    <>
      <Routes>
        {routes.map((route, idx) => (
          <Route key={idx} path={route.path} element={route.element} />
        ))}
      </Routes>
    </>
  );
}

export default App;
