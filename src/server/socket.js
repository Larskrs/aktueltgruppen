const WebSocket = require('ws');
import { v1 } from 'uuid';

let clients = 0; 
let requests = 0;
let users = []

export let wss


export function Broadcast (message) {
    wss.clients.forEach((client) => {
        client.send(JSON.stringify({message}));
    });
}

export function CreateServer () {
    wss = new WebSocket.Server({ port: process.env.WebSocket.port });

    wss.on('connection', (ws) => {
        const clientId = v1();
        let username = null
        let color = null
        console.log(`Client ${clientId} connected`);
    
        // Send client ID to the new client
        ws.send(JSON.stringify({changeClientId: clientId}));
    
        wss.clients.forEach((client) => {
            client.send(JSON.stringify({clients: wss.clients.size}));
        });

    
        ws.on('message', (message) => {
            const parsedMessage = JSON.parse(message.toString());
            console.log(`Received from client ${clientId}:`, message.toString());
            
            if (parsedMessage.video) {
                requests++
                // console.log(`Received video from client ${clientId} ${requests}`);
                
            } else if (parsedMessage.text) {
                console.log(`Received text from client ${clientId}`)
                console.log(parsedMessage.text)
            } else if (parsedMessage.setUsername) {
                console.log(`Received USERNAME: [${parsedMessage.setUsername}] from ${clientId}`)
                console.log(`Received СOLOR   : [${parsedMessage.setColor}] from ${parsedMessage.setUsername}`)
                username = parsedMessage.setUsername;
                color    = parsedMessage.setColor;
    
                wss.clients.forEach((client) => {
                    client.send(JSON.stringify({type: "user_join", clientId, username, color}))
                })
                return;
            }
            
            // Add client ID to the message
            const messageWithClientId = { ...parsedMessage, clientId, username, color};
            // Broadcast the message to all clients
            wss.clients.forEach((client) => {
                client.send(JSON.stringify(messageWithClientId));
            });
        });
    
        ws.on('close', () => {
            console.log(`Client ${clientId} disconnected`);
            wss.clients.forEach((client) => {
                if (username) client.send(JSON.stringify({type: "user_disconnect", clientId, username, color}))
                client.send(JSON.stringify({clients: wss.clients.size, users: users.size}));
            });
        });
    });

    console.log(`WebSocket server running on [ws://${process.env.WebSocket.host}:${process.env.WebSocket.port}]`);
    
}
function userOnConnect () {

}

function onMessage (message) {

}
