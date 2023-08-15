import { validateAdmin } from "../services/AuthService";
import { PAGE_LIST, LOOKUP_LIST } from "/src/constants";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Stack, Card } from "react-bootstrap";

const Home = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  var pageList = [...PAGE_LIST];
  if (validateAdmin()) pageList = [...pageList, ...LOOKUP_LIST];

  return (
    <>
      <h3>{t("home")}</h3>
      <Stack direction="horizontal" gap={3}>
        {pageList.map((item, index) => {
          const { name, url } = item;
          return (
            <Card
              key={index}
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
          );
        })}
      </Stack>
    </>
  );
};

export default Home;
