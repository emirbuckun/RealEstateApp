import { createContext, useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

export const LogContext = createContext();

export const LogProvider = (props) => {
  const [logs, setLogs] = useState([]);
  const [socketUrl] = useState("ws://localhost:3001/ws");
  const [logNotification, setLogNotification] = useState(false);
  const { lastJsonMessage, readyState } = useWebSocket(socketUrl);
  const [localLogs, setLocalLogs] = useState([]);

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  const equalsCheck = (a, b) => JSON.stringify(a) === JSON.stringify(b);

  const isNewLog = () =>
    lastJsonMessage && !equalsCheck(lastJsonMessage, localLogs);

  useEffect(() => {
    if (isNewLog()) {
      setLogs(lastJsonMessage);
      setLocalLogs(lastJsonMessage);
      setLogNotification(true);
      localStorage.setItem("logs", JSON.stringify(lastJsonMessage));
    } else {
      setLogs(localLogs);
    }
  }, [lastJsonMessage]);

  useEffect(() => {
    const localLogs = localStorage.getItem("logs");
    localLogs && localLogs != "" && setLocalLogs(JSON.parse(localLogs));
  }, []);

  return (
    <LogContext.Provider
      value={{
        logs,
        logNotification,
        connectionStatus,
        setLogNotification,
      }}
    >
      {props.children}
    </LogContext.Provider>
  );
};
