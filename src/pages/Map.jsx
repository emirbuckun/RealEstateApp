import { useState, useEffect } from "react";
import { getEstates } from "/src/services/EstateService";
import { useTranslation } from "react-i18next";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Button } from "react-bootstrap";

const Map = () => {
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

  useEffect(() => {
    fetchEstates();
  }, []);

  const position = [15, 15];
  return (
    <>
      <h3>{t("map")}</h3>
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
                        {t("name")}: {name} <br />
                        {t("type")}: {estateType} <br />
                        {t("status")}: {estateStatus} <br />
                        {t("startDate")}:{" "}
                        {new Date(startDate).toISOString().split("T")[0]} <br />
                        {t("endDate")}:{" "}
                        {new Date(endDate).toISOString().split("T")[0]} <br />
                        <Button
                          variant="outline-primary"
                          href={"/estate/edit/" + id}
                        >
                          {t("goToDetails")}
                        </Button>
                      </Popup>
                    </Marker>
                  );
                })}
              </>
            ) : (
              t("noEstateExistMessage")
            )
          ) : (
            t("loading")
          )}
        </MapContainer>
      </div>
    </>
  );
};

export default Map;
