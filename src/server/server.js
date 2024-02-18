const WebSocket = require('ws');
import { v1 } from 'uuid';

const wss = new WebSocket.Server({ port: 3001 });
let requests = 0;

wss.on('connection', (ws) => {
    const clientId = v1();
    console.log(`Client ${clientId} connected`);

    // Send client ID to the new client
    ws.send(JSON.stringify({changeClientId: clientId}));

    ws.on('message', (message) => {
        const parsedMessage = JSON.parse(message.toString());
        // console.log(`Received from client ${clientId}:`, message.toString());
        if (parsedMessage.video) {
            requests++
            console.log(`Received video from client ${clientId} ${requests}`);
            
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
    });
});


console.log('WebSocket server running on ws://localhost:3001');