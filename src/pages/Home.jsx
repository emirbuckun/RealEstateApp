import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
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
      <h1>Home</h1>
      <span>Click to see the lists.</span>
      <br />
      <br />
      <div className="card-container">
        {list.map((item, index) => {
          return <Card key={index} name={item.name} url={item.url} />;
        })}
      </div>
    </>
  );
};

const Card = ({ name, url }) => {
  const navigate = useNavigate();
  return (
    <div className="card" onClick={() => navigate(url)}>
      <h3>{name}</h3>
    </div>
  );
};

export default Home;
