"use client"
import Image from "next/image"
import styles from "./FadeImage.module.css"
import { useState } from "react"

const FadeImage = (props, {}) => {

    const [isLoaded, setIsLoaded] = useState(false)

    return (
        // eslint-disable-next-line jsx-a11y/alt-text
            <div className={styles.image}>
                <div className={isLoaded ? null : styles.overlay}></div>
                <Image
                    className={isLoaded ? styles.loaded : styles.loading}
                    {...props}
                    onLoad={() => setIsLoaded(true)}
                />

            </div>
    )
}

export default FadeImage