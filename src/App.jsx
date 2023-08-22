import { Suspense } from "react";
import AppRouter from "./AppRouter";
import Navbar from "./components/Navbar";
import { useTranslation } from "react-i18next";
import { LogProvider } from "./contexts/LogContext";
import { Container } from "react-bootstrap";

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
      <LogProvider>
        <Navbar />
        <Container>
          <AppRouter />
        </Container>
      </LogProvider>
    </Suspense>
  );
}

export default App;
