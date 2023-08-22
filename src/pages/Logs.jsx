import { useContext, useEffect } from "react";
import { Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { LogContext } from "/src/contexts/LogContext";

const Logs = () => {
  const { logs, connectionStatus, setLogNotification } = useContext(LogContext);
  const { t } = useTranslation();

  useEffect(() => {
    setLogNotification(false);
  }, [logs]);

  return (
    <>
      <h3>{t("logs")}</h3>

      <label className="mb-3">
        The web socket connection is currently <b>{connectionStatus}</b>
      </label>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Level</th>
            <th>Message</th>
            <th>Timestamp</th>
          </tr>
        </thead>

        <tbody>
          {logs &&
            logs.map((message, index) => {
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

export default Logs;
