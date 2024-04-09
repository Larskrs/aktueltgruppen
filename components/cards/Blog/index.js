"use client"
import styles from "./style.module.css"
import FadeImage from "../../common/FadeImage/FadeImage"

export default function Blog ({
    title="",
    description="",
    img="",
}) {
    return (
        <div className={styles.blog}>   
            <FadeImage src={img} width={400} height={200}/>
            <div className={styles.info}>
                <p className={styles.date}>08.04.2024</p> 
                <p className={styles.title}>{title}</p> 
                <p className={styles.description}>{description}</p> 
                <button >Les mer</button>
            </div>
        </div>
    )
}
