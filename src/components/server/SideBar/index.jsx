"use client"
import Link from "next/link";
import { useState } from "react";
import styles from "./style.module.css"
import Image from "next/image";

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

    return (
        <div className={styles.container}>
            <Image onClick={() => {setVisible(visible)}} alt="Logo" src={"/aktuelt_icon.svg"} width={42} height={42} />


            <div className={styles.modal} style={modalStyle()}>
                <div className={styles.side} style={sideStyle()} >
                    <div className={styles.links}>
                        <Link href={"/dashboard"}>Dashboard</Link>
                    </div>
                </div>
                {visible && <div className={styles.backdrop} onClick={() => {setVisible(!visible)}} />}
            </div>
        </div>
    );
}