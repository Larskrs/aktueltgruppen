/* eslint-disable @next/next/no-img-element */
"use client"
import { useState, useEffect, useRef } from 'react';
import styles from "./page.module.css";
import { Input } from '../../../../components';
import NextImage from 'next/image';
import MaxHeightImage from '../../../../components/common/MaxHeightImage';

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
    const [users, setUsers] = useState([])
    const messageEndRef = useRef(null);

    function Connect () {

        
    }

    const shadeColor = (col, amt) => {
        var num = parseInt(col, 16);
        var r = (num >> 16) + amt;
        var b = ((num >> 8) & 0x00FF) + amt;
        var g = (num & 0x0000FF) + amt;
        var newColor = g | (b << 8) | (r << 16);
        return newColor.toString(16);
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
            if (data.type && data.type == "user_join") {
                setUsers([...users, {
                    clientId: data.clientId,
                    username: data.username,
                    color:    data.color
                }])
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
    
    const connectToRoom = (username, color) => {
            console.log('Connecting to room ' + username)
            const messageObject = { setUsername: username, setColor: color };
            ws.send(JSON.stringify(messageObject));
            setIsChatting(true)
    };

    const sendMessage = () => {
        if (ws && message) {
            const messageObject = { type: "text", text: message };
            ws.send(JSON.stringify(messageObject));
            setMessage('');
        }
    };

    const scrollToBottom = () => {
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    const getUser = (clientId) => {
        const filtered = users.filter((user) => user.clientId == clientId)
        if (filtered.length > 0) {
            return filtered[0]
        }
    }

    function convertImageToBase64(imgUrl, callback) {
        const image = new Image();
        image.crossOrigin='anonymous';
        image.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.height = image.naturalHeight;
          canvas.width = image.naturalWidth;
          ctx.drawImage(image, 0, 0);
          const dataUrl = canvas.toDataURL();
          callback && callback(dataUrl)
        }
        image.src = imgUrl;
      }

    return (
        <div className={styles.container}>
            {/* {clientId && <p>Client ID: {clientId}</p>} */}

            <div className={styles.header}>
                <h1>Velkommen til Aktuelt Chat</h1>
                <p>Skriv inn brukernavnet ditt for å begynne å chatte.</p>
                <br />

                <Input.NamedField disabled={isChatting} title='Brukernavn' submitButton='Sett Brukernavn' resetOnEnter={false} lockOnEnter={true} onEnter={(username) => {
                   let color = "#" + Math.floor(Math.random()*16777215).toString(16);
                   connectToRoom(username, color);
                }} />
            </div>

            {console.log(users)}

            {isChatting &&
            <>
                <ul className={styles.messageContainer}>
                    {messages.filter((m) => m).map((msg, index) => {
                        if (msg.type == "text") {
                            return (
                                <div key={index} className={styles.message} style={clientId === msg.clientId ? {marginLeft: "auto", background: "var(--accent-300)" } : {background: msg.color}}>
                                    <span style={{color: msg.color}}>{msg.username}</span>
                                    <p>{msg.text}</p>
                                </div>
                            )
                        } else if (msg.type == "user_join") {
                            return (
                                <div key={index} className={styles.server_message}>
                                    <span style={{color: msg.color}}>{msg.clientId == clientId ? "Du" : msg.username}</span>
                                     ble med i samtalen
                                </div>
                            )
                        } else if (msg.type == "user_disconnect") {
                            return (
                                <div key={index} className={styles.message} style={{background: "transparent", color: "var(--text-950)", marginInline: "auto"}}>
                                    {msg.username} forlot samtalen.
                                </div>
                            )
                        } else if (msg.type == "image_attachment") {
                            return (
                                <div key={index} className={styles.image_attachment} style={clientId === msg.clientId ? {marginLeft: "auto" } : {}}>
                                    <span style={clientId === msg.clientId ? {} : {}}>{msg.username}</span>
                                    <div>
                                        <MaxHeightImage maxHeight={300} src={msg.image} onLoad={() => {scrollToBottom()}}/>          
                                    </div>
                                </div>
                            )
                        } else {
                            return (
                                <p key={index} style={{marginInline: "auto"}}>{JSON.stringify(msg) + ""}</p>
                            )
                        }
                    })}
                    <div ref={messageEndRef} />
                </ul>
                <div className={styles.input}>
                    <label htmlFor='fileInput' className={styles.imageSelect}><NextImage className='invert' width={32} height={32} src={"/icons/Image Select Icon.svg"} /></label>
                    <input id='fileInput' style={{display: "none"}} type='file' accept='.png, .jpg, .gif' onChange={(e) => {console.log(e.target.files); convertImageToBase64(URL.createObjectURL(e.target.files[0]), (url) => {
                        setMessage("")
                        ws.send(JSON.stringify({type: "image_attachment", image: url}))
                        console.log(url)
                    })}} />
                    <Input.NamedField title='' submitButton={"Send"} resetOnEnter={true} onChange={(value) => setMessage(value)} onEnter={() => sendMessage()} />
                </div>
            </>
            }
        </div>
    );
}
