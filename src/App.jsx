import { Suspense } from "react";
import AppRouter from "./AppRouter";
import Navbar from "./pages/Navbar";
import { useTranslation } from "react-i18next";

function App() {
  const { t } = useTranslation();
  return (
    <Suspense
      fallback={
        <h3 className="d-flex justify-content-center align-items-center">
          🌀 {t("loading")}
        </h3>
      }
    >
      <Navbar />
      <AppRouter />
    </Suspense>
  );
}

export default App;
