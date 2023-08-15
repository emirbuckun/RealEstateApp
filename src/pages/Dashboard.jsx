import { useState, useEffect } from "react";
import { getEstates } from "/src/services/EstateService";
import { useTranslation } from "react-i18next";
import { Col, Row } from "react-bootstrap";
import { Chart } from "/src/components/Chart";

const Dashboard = () => {
  const { t } = useTranslation();
  const [{ estates, loading, error }, setState] = useState({
    estates: [],
    loading: true,
    error: null,
  });

  const fetchEstates = () => {
    setState({ error: null, loading: true });
    getEstates()
      .then((response) => {
        if (response.status == 200) {
          setState({ estates: response.data, loading: false });
        } else
          setState({
            loading: false,
            error: response.status + ": " + response.data.statusText,
          });
      })
      .catch((error) => setState({ error, loading: false }));
  };

  if (estates) {
    var types = Object.values(
      estates.reduce((a, { estateType }) => {
        let key = `${estateType}`;
        a[key] = a[key] || { name: estateType, value: 0 };
        a[key].value++;
        return a;
      }, {})
    );
    var statuses = Object.values(
      estates.reduce((a, { estateStatus }) => {
        let key = `${estateStatus}`;
        a[key] = a[key] || { name: estateStatus, value: 0 };
        a[key].value++;
        return a;
      }, {})
    );
  }

  const pieTypeData = types;
  const pieStatusData = statuses;

  useEffect(() => {
    fetchEstates();
  }, []);

  return (
    <>
      <h3>{t("dashboard")}</h3>

      {!loading ? (
        error ? (
          t("errorOccurred") + error
        ) : estates.length > 0 ? (
          <>
            <Row>
              <Col sm={12} md={8} lg={6}>
                <h5>{t("types")}</h5>
                <Chart data={pieTypeData} />
              </Col>
              <Col sm={12} md={8} lg={6}>
                <h5>{t("statuses")}</h5>
                <Chart data={pieStatusData} />
              </Col>
            </Row>
          </>
        ) : (
          t("noEstateExistMessage")
        )
      ) : (
        t("loading")
      )}
    </>
  );
};

export default Dashboard;
