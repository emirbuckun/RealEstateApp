import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Col } from "react-bootstrap";

const Home = () => {
  const navigate = useNavigate();
  const list = [
    { name: "Currencies", url: "/currencies" },
    { name: "Estates", url: "/estates" },
    { name: "Statuses", url: "/statuses" },
    { name: "Types", url: "/types" },
    { name: "Photos", url: "/photos" },
    { name: "Prices", url: "/prices" },
  ];

  return (
    <>
      <h3>Home</h3>
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