import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Home = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const list = [
    { name: t("currencies"), url: "/currencies" },
    { name: t("estates"), url: "/estates" },
    { name: t("statuses"), url: "/statuses" },
    { name: t("types"), url: "/types" },
    { name: t("photos"), url: "/photos" },
    { name: t("prices"), url: "/prices" },
  ];

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
