/* eslint-disable @next/next/no-img-element */
"use client"
import { useState, useEffect, useRef } from 'react';
import styles from "./page.module.css";
import { Input } from '../../../../components';

export default function Home() {
    const [ws, setWs] = useState(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [clientId, setClientId] = useState(null); // State variable to store client ID
    const [shouldConnect, setShouldConnect] = useState(false); 
    const [incomingVideoData, setIncomingVideoData] = useState(null);
    const [clients, setClients] = useState(0)
    const [usernane, setUsername] = useState("");
    const [isChatting, setIsChatting] = useState(false)
    const messageEndRef = useRef(null);

    function Connect () {

        
    }

    useEffect(() => {
        let client = null;
        const url = `ws://${process.env.WebSocket.host}:${process.env.WebSocket.port}`;
        console.log(`Connecting to ${url}`);
        const socket = new WebSocket(url);
        socket.onopen = () => {
            console.log('Connected to WebSocket server');
            setWs(socket);
        };
        socket.onmessage = (event) => {
            const data = JSON.parse(event.data.toString());
            // Check if the received data contains client ID
            if (data.clients) {
                setClients(data.clients)
            }
            if (data.changeClientId) {
                console.log('Client ID = ', clientId);
                console.log('Setting client ID ', data.changeClientId)
                setClientId(data.changeClientId)
                client = data.changeClientId
            }
            if (data.video) {
                if (data.clientId == client) { return; }
                console.log(client, clientId)
                setIncomingVideoData(data.video)
                return;
            }
            setMessages(prevMessages => [...prevMessages, data]);
            console.log(data)
            scrollToBottom()
        };
        socket.onclose = () => {
            console.log('Disconnected from WebSocket server');
        };

        return () => {
            if (socket) {
                socket.close();
            }
        };
        
    }, []);
    
    const connectToRoom = (username) => {
            console.log('Connecting to room ' + username)
            const messageObject = { setUsername: username };
            ws.send(JSON.stringify(messageObject));
            setIsChatting(true)
    };

    const sendMessage = () => {
        if (ws && message) {
            const messageObject = { text: message };
            ws.send(JSON.stringify(messageObject));
            setMessage('');
        }
    };

    const scrollToBottom = () => {
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className={styles.container}>
            {/* {clientId && <p>Client ID: {clientId}</p>} */}

            <div className={styles.header}>
                <h1>Velkommen til Aktuelt Chat</h1>
                <p>Skriv inn brukernavnet ditt for å begynne å chatte.</p>
                <br />

                <Input.NamedField disabled={isChatting} title='Brukernavn' submitButton='Sett Brukernavn' resetOnEnter={false} lockOnEnter={true} onEnter={(val) => {
                    connectToRoom(val);
                }} />
            </div>

            {isChatting &&
            <>
                <ul className={styles.messageContainer}>
                    {messages.filter((m) => m.text).map((msg, index) => (
                        <div key={index} className={styles.message} style={clientId === msg.clientId ? {marginLeft: "auto", background: "var(--accent-300)" } : {background: "var(--secondary-300)"}}>
                            <span style={clientId === msg.clientId ? {} : {}}>{msg.username}</span>
                            <p>{msg.text + ""}</p>
                        </div>
                    ))}
                    <div ref={messageEndRef} />
                </ul>
                <div className={styles.input}>
                    <Input.NamedField title='' resetOnEnter={true} onChange={(value) => setMessage(value)} onEnter={() => sendMessage()} />
                    <button onClick={sendMessage}>Send</button>
                </div>
            </>
            }
        </div>
    );
}
