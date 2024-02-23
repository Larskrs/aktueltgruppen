/* eslint-disable @next/next/no-img-element */
"use client"
import { useState, useEffect } from 'react';
import styles from "./page.module.css";

export default function Home() {
    const [ws, setWs] = useState(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [clientId, setClientId] = useState(null); // State variable to store client ID
    const [shouldConnect, setShouldConnect] = useState(false); 
    const [incomingVideoData, setIncomingVideoData] = useState(null);
    const [record, setRecord] = useState(true);
    const [clients, setClients] = useState(0)

    function Connect () {

        
    }

    useEffect(() => {
        let client = null;
        const url = `ws://${process.env.WebSocket.host}:${process.env.WebSocket.port}`;
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

    useEffect(() => {
        const intervalId = setInterval(() => {
          // Your code to run every 1000 milliseconds goes here
          processStream()
        }, 1000/60);

        return () => {
          clearInterval(intervalId);
        };
      }, [ws, incomingVideoData]);
    
    useEffect(() => {
        const webcam = document.getElementById('webcam');

        if (!navigator.mediaDevices) {
			return;
		}

        if (navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then((stream) => {
                    webcam.srcObject = stream;
                    let {width, height} = stream.getTracks()[0].getSettings();
                    processStream()
                })
                .catch((error) => {
                    console.error('Error accessing webcam:', error);
                });
        } else {
            console.error('getUserMedia not supported in this browser.');
        }
    }, []);

    function processStream () {
        if (!ws) { return; }
        var canvas = document.getElementById('canvas');
        if (!canvas) {
            return
        }
        var video = document.getElementById('webcam');
        canvas.width = 640;
        canvas.height = 360
        canvas.getContext('2d').drawImage(video, 0, 0, 640, 360);
        let resultb64 = canvas.toDataURL();
        ws.send(JSON.stringify({video: resultb64}));
    }

    const sendMessage = () => {
        if (ws && message) {
            const messageObject = { text: message };
            ws.send(JSON.stringify(messageObject));
            setMessage('');
        }
    };

    return (
        <div className={styles.container}>
            {clientId && <p>Client ID: {clientId}</p>} {/* Display client ID if available */}

            <video  style={{display: "none"}} id='webcam' width={640} height={360} autoPlay/>
            <div className={styles.cameraGrid}>
                <canvas className={styles.camera} id='canvas' width={640} height={360} />
                {record && <img className={styles.camera}  alt='' fetchPriority='high' src={`${incomingVideoData}`} width={640} height={360}/>}
            </div>

            <ul className={styles.messageContainer}>
                {messages.filter((m) => {
                    return m.text
                }).map((msg, index) => (
                    <div key={index} className={styles.message} style={clientId == msg.clientId ? {background: "#222 ", marginLeft: "auto"} : {}}>
                        <span style={clientId == msg.clientId ? {background: "#b17f7f"} : {}}>{clientId == msg.clientId ? "You" : "Anon"}</span>
                        <p >{msg.text}</p>
                    </div>
                ))}
            </ul>
            <div className={styles.input}>
                <input className={styles.messageInput} type="text" value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={((e) => {
                    if (e.key === "Enter") {
                        sendMessage()
                    }
                })} />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
}
