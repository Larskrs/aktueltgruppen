"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./layout.module.css"
import { usePathname } from "next/navigation";
import useFetch from "../../../hooks/useFetch";
import Image from "next/image";

const navLinks = [,
    { name: "Om oss", href: "/about"} ,
    { name: "Filmer", href: "/films"} ,
    { name: "Chat", href: "/chat"} ,
]

export default function Layout({ children }) {

    const [ws, setWs] = useState(null)
    const [clients, setClients] = useState(0)

    useEffect(() => {
        
        const url = `ws://${process.env.WebSocket.host}:${process.env.WebSocket.port}`;
        const socket = new WebSocket(url)
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
        };
        socket.onclose = () => {
            console.log('Disconnected from WebSocket server');
        };

        return () => {
            if (socket) {
                socket.close();
            }
        };
        
    }, [])

    const [state, setState] = useState("")
    const pathname = usePathname()

    return (
        <div className={styles.container}>
            <nav className={styles.nav}>

                <Link href={"/"}>
                    <Image src={"/aktuelt_icon.svg"} width={42} height={42} />
                </Link>
                
                {navLinks.map((link) => {
                const isActive = pathname.startsWith(link.href)

                return (
                    <Link key={link.name} href={link.href} 
                        className={isActive ? styles.active : styles.inactive}
                    >
                        {link.name}
                    </Link>
                )
                })}

                {/* <div className={styles.widget}>{clients} person{clients > 1 ? "er" : ""}</div> */}
            
            </nav>

            <main className={styles.main}>
                {children}
            </main>
        </div>
    );
}