import { useState, useEffect } from "react";
import { getEstates } from "/src/services/EstateService";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Button } from "react-bootstrap";

const Map = () => {
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

  useEffect(() => {
    fetchEstates();
  }, []);

  const position = [15, 15];
  return (
    <>
      <h3>Map</h3>
      <div className="mt-10">
        <MapContainer
          center={position}
          zoom={5}
          scrollWheelZoom={false}
          style={{ width: "70vw", height: "70vh" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {!loading ? (
            error ? (
              "An error occured: " + error
            ) : estates.length > 0 ? (
              <>
                {estates.map((estate, index) => {
                  const {
                    id,
                    name,
                    estateType,
                    estateStatus,
                    startDate,
                    endDate,
                    latitude,
                    longitude,
                  } = estate;
                  return (
                    <Marker key={index} position={[latitude, longitude]}>
                      <Popup>
                        Name: {name} <br />
                        Type: {estateType} <br />
                        Status: {estateStatus} <br />
                        Start Date:{" "}
                        {new Date(startDate).toISOString().split("T")[0]} <br />
                        End Date:{" "}
                        {new Date(endDate).toISOString().split("T")[0]} <br />
                        <Button
                          variant="outline-primary"
                          href={"/estate/edit/" + id}
                        >
                          Go to details
                        </Button>
                      </Popup>
                    </Marker>
                  );
                })}
              </>
            ) : (
              "There is no any estate."
            )
          ) : (
            "Loading.."
          )}
        </MapContainer>
      </div>
    </>
  );
};

export default Map;
