"use client"
import Link from "next/link";
import { useState } from "react";
import styles from "./style.module.css"
import Image from "next/image";
import { usePathname } from "next/navigation";
import FadeImage from "@/components/common/FadeImage/FadeImage";

export default function SideBar ({isVisible = false}) {

    const [visible, setVisible] = useState(isVisible)

    const sideStyle = () => {
        if (visible) {
            return {
                left: 0,
            }
        } else {
            return {
                left: "-240px",
            }
        }
    }
    const modalStyle = () => {
        if (visible) {
            return {
                opacity: "1",
                pointerEvents: "all"

            }
        } else {
            return {
                opacity: 0,
                pointerEvents: "none"
            }
        }
    }

    const navLinks = [,
        { name: "Artikler", href: "/articles"} ,
        { name: "Chat", href: "/chat"} ,
    ]

    const pathname = usePathname()

    return (
        <div className={styles.container}>
            <Image onClick={() => {setVisible(!visible)}} alt="Logo" src={"/aktuelt.svg"} width={105} height={42} />


            <div className={styles.modal} style={modalStyle()}>
                <div className={styles.side} style={sideStyle()} >

                    <div className={styles.header}>
                        <FadeImage src={"/aktuelt.svg"} width={200} height={80}/>
                    </div>

                    <div className={styles.links}>
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
                    </div>
                </div>
                {visible && <div className={styles.backdrop} onClick={() => {setVisible(!visible)}} />}
            </div>
        </div>
    );
}