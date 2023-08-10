import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { getEstates } from "/src/services/EstateService";
import { useTranslation } from "react-i18next";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

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
        console.log(response);
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

  const COLORS = ["#3366ff", "#ff0066", "#99ff33", "#FF8042", "#AF19FF"];

  const CustomTooltip = ({ active, payload }) => {
    if (active) {
      return (
        <div
          className="custom-tooltip"
          style={{
            backgroundColor: "#123",
            padding: "5px",
            border: "1px solid #cccc",
          }}
        >
          <label>{`${payload[0].name}: ${payload[0].value}`}</label>
        </div>
      );
    }
    return null;
  };

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
                <PieChart width={730} height={300}>
                  <Pie
                    data={pieTypeData}
                    color="#000000"
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    fill="#8884d8"
                  >
                    {pieTypeData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                </PieChart>
              </Col>
              <Col sm={12} md={8} lg={6}>
                <h5>{t("statuses")}</h5>
                <PieChart width={730} height={300}>
                  <Pie
                    data={pieStatusData}
                    color="#000000"
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    fill="#8884d8"
                  >
                    {pieStatusData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS.reverse()[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                </PieChart>
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
