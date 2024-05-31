"use client"
import styles from "./LoadingFill.module.css"
import { useState } from "react"

const FadeImage = () => {
    return (
        // eslint-disable-next-line jsx-a11y/alt-text
            <div className={styles.fill}>
                <div className={styles.overlay}></div>

            </div>
    )
}

export default FadeImage