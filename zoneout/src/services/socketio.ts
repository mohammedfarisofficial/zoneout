const WEBSOCKET_URL = process.env.REACT_APP_WSS_URL;

console.log("WEBSOCKET_URL",WEBSOCKET_URL)


export let socket: WebSocket;
let isManuallyClosed = false;

const reconnectInterval = 5000; // Retry every 5 seconds
let reconnectTimeout: NodeJS.Timeout | null = null;

export const connectWebSocket = () => {
  console.log("Connecting to WebSocket...");

  if (!WEBSOCKET_URL) {
    console.log("WEBSOCKET_URL not found!");
    return;
  }
  socket = new WebSocket(WEBSOCKET_URL);

  socket.onopen = () => {
    console.log("Connected to the WebSocket server");
    if (reconnectTimeout) {
      clearTimeout(reconnectTimeout);
      reconnectTimeout = null;
    }
  };

  socket.onmessage = event => {
    console.log("Received message:", event.data);
    // Handle incoming messages
  };

  socket.onerror = error => {
    console.error("WebSocket error:", error);
  };

  socket.onclose = () => {
    console.log("Disconnected from WebSocket server");
    if (!isManuallyClosed) {
      attemptReconnect();
    }
  };
};

// Attempt to reconnect
const attemptReconnect = () => {
  if (reconnectTimeout) return; // Prevent duplicate timeouts
  console.log(`Reconnecting in ${reconnectInterval / 1000} seconds...`);
  reconnectTimeout = setTimeout(() => {
    connectWebSocket();
  }, reconnectInterval);
};

// Send a message through WebSocket
export const sendMessage = (message: object) => {
  if (socket?.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(message));
  } else {
    console.log("WebSocket is not open. Message not sent.");
  }
};

// Manually close WebSocket connection
export const closeWebSocket = () => {
  isManuallyClosed = true;
  socket?.close();
};

// Start WebSocket connection
connectWebSocket();
