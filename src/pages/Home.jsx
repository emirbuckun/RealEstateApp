import { validateAdmin } from "../services/AuthService";
import { PAGE_LIST } from "/src/constants";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Col, Row, Card } from "react-bootstrap";

const Home = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  var pageList = [...PAGE_LIST.main];
  if (validateAdmin())
    pageList = [...pageList, ...PAGE_LIST.admin, ...PAGE_LIST.lookup];

  return (
    <>
      <h3>{t("home")}</h3>
      <Row>
        {pageList.map((item, index) => {
          const { name, url } = item;
          return (
            <Col key={index} className="mb-3">
              <Card
                style={{
                  cursor: "pointer",
                }}
                onClick={() => navigate(url)}
                border="primary"
              >
                <Card.Body>
                  <Card.Title>{t(name)}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default Home;
