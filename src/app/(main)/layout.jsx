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

                <Link href={"/"} className={styles.logo}>
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

                <div className={styles.widget}>Menu</div>
            
            </nav>

            <main className={styles.main}>
                {children}
            </main>

            <footer className={styles.footer}>
                <div className={styles.grid}>
                    <section>
                        <h2>Kontakt Oss</h2>
                        <p>Epost <span>info@aktuelt.tv</span></p>
                    </section>
                    <section>
                        <Image style={{objectFit: "contain"}} src={"/aktuelt.svg"} width={200} height={50}/>
                    </section>
                    <section>
                            <Link href={"/"}>Prosjekter</Link>
                            <Link href={"/"}>Tilbud til elever</Link>
                    </section>
                </div>
            </footer>
        </div>
    );
}