import { Container, Card, Row, Col } from "react-bootstrap";
import { validateAdmin } from "../services/AuthService";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const isAdmin = validateAdmin();
  const list = [
    { name: t("estates"), url: "/estates" },
    { name: t("map"), url: "/map" },
    { name: t("dashboard"), url: "/dashboard" },
    { name: t("photos"), url: "/photos" },
    { name: t("prices"), url: "/prices" },
  ];

  if (isAdmin) {
    list.push({ name: t("types"), url: "/types" });
    list.push({ name: t("statuses"), url: "/statuses" });
    list.push({ name: t("currencies"), url: "/currencies" });
  }

  return (
    <>
      <h3>{t("home")}</h3>
      <Container>
        <Row>
          {list.map((item, index) => {
            const { name, url } = item;
            return (
              <Col key={index}>
                <Card
                  key={index}
                  style={{
                    cursor: "pointer",
                    width: "12rem",
                  }}
                  onClick={() => navigate(url)}
                  className="mb-3 card"
                  border="primary"
                >
                  <Card.Body>
                    <Card.Title>{name}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default Home;
