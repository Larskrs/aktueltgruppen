"use client"
import styles from "./layout.module.css"
import { useState } from "react"

export default function Layout ({
    children,
}) {
    return (
        <>
            <div className={styles.container}>
                {children}
            </div>
        </>
    )
}