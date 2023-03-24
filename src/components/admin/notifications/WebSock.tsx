import axios from "axios";
import { useEffect, useRef, useState } from "react";

const WebSock = () => {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");
  const socket = useRef();
  const [connected, setConnected] = useState(false);
  const [username, setUsername] = useState("");

  // function connect() {
  //   socket.current = new WebSocket("ws://localhost:3000");

  //   socket.current.onopen = () => {
  //     setConnected(true);
  //     console.log("Connected successfully");
  //   };
  //   socket.current.onmessage = () => {};
  //   socket.current.onclose = () => {
  //     console.log("Socket closed");
  //   };
  //   socket.current.onerror = () => {
  //     console.log("Socket error");
  //   };
  // }

  const sendMessage = async () => {
    await axios.post("http:localhost:5000/new-messages", {
      message: value,
      id: Date.now(),
    });
  };

  if (!connected) {
    return (
      <div>
        <div>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Enter your name"
          />
          {/* <button onClick={connect}>Voiti</button> */}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div>Hz che eto</div>
    </div>
  );
};

export default WebSock;
