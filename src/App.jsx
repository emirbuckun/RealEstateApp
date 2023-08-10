import { Suspense } from "react";
import AppRouter from "./AppRouter";
import Navbar from "./pages/Navbar";

function App() {
  return (
    <Suspense
      fallback={
        <h3 className="d-flex justify-content-center align-items-center">
          🌀 Loading...
        </h3>
      }
    >
      <Navbar />
      <AppRouter />
    </Suspense>
  );
}

export default App;
