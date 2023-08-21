import React, { useState, useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { Table, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const WebSocketDemo = () => {
  const [socketUrl, setSocketUrl] = useState("ws://localhost:3001/ws");
  const { lastJsonMessage, readyState } = useWebSocket(socketUrl);
  const [data, setData] = useState([]);
  const { t } = useTranslation();

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  useEffect(() => {
    if (lastJsonMessage !== null) setData(lastJsonMessage);
    localStorage.setItem("newLog", "true");
  }, [lastJsonMessage]);

  return (
    <>
      <h3>{t("logs")}</h3>

      <label className="mb-3">
        The web socket connection is currently <b>{connectionStatus}</b>
      </label>
      <br></br>

      <Button
        onClick={() => setSocketUrl("ws://localhost:3001/ws")}
        variant="outline-primary"
        className="mb-3 me-2"
      >
        Reconnect
      </Button>

      <Button
        onClick={() => setSocketUrl("wss://demos.kaazing.com/echo")}
        variant="outline-danger"
        className="mb-3 me-2"
      >
        Disconnect
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Level</th>
            <th>Message</th>
            <th>Timestamp</th>
          </tr>
        </thead>

        <tbody>
          {data &&
            data.map((message, index) => {
              const { Level, RenderedMessage, UtcTimeStamp } = message;
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{Level}</td>
                  <td>{RenderedMessage}</td>
                  <td>{new Date(UtcTimeStamp).toLocaleString()}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </>
  );
};

export default WebSocketDemo;
