const WebSocket = require('ws');
import { v1 } from 'uuid';

let clients = 0; 
const wss = new WebSocket.Server({ port: process.env.WEBSOCKET_PORT });
let requests = 0;

wss.on('connection', (ws) => {
    const clientId = v1();
    console.log(`Client ${clientId} connected`);

    // Send client ID to the new client
    ws.send(JSON.stringify({changeClientId: clientId}));

    wss.clients.forEach((client) => {
        client.send(JSON.stringify({clients: wss.clients.size}));
    });

    ws.on('message', (message) => {
        const parsedMessage = JSON.parse(message.toString());
        // console.log(`Received from client ${clientId}:`, message.toString());
        if (parsedMessage.video) {
            requests++
            // console.log(`Received video from client ${clientId} ${requests}`);
            
        } else if (parsedMessage.text) {
            console.log(`Received text from client ${clientId}`)
            console.log(parsedMessage.text)
        }
        // Add client ID to the message
        const messageWithClientId = { ...parsedMessage, clientId };
        // Broadcast the message to all clients
        wss.clients.forEach((client) => {
                client.send(JSON.stringify(messageWithClientId));
        });
    });

    ws.on('close', () => {
        console.log(`Client ${clientId} disconnected`);
        wss.clients.forEach((client) => {
            client.send(JSON.stringify({clients: wss.clients.size}));
        });
    });
});


console.log(`WebSocket server running on ws://${process.env.WEBSOCKET_HOST}:${process.env.WEBSOCKET_PORT}`);