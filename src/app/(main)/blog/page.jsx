import Image from "next/image"
import styles from "./page.module.css"
import NamedButton from "../../../../components/input/NamedButton/NamedButton"
import FadeImage from "../../../../components/common/FadeImage/FadeImage"
export default function Blog ({}) {

    const blogs = [
        "Dette er en blog ingen kommer til å lese",
        "Hvor mange barn er i kjelleren til Lars? hehe, du er morsom. Men ikke spør det igjen.",
        "Hei kæll, Hvor er beina dine?",
        "Klokken er 01.17, HJELP"
        
    ]

    return (
        <div className={styles.container}>
            <div className={styles.blogs}>
                    <div className={styles.header}>
                        <h3>Artikler</h3>
                        <button>Vis mer</button>
                    </div>
                <div className={styles.grid}>
                    {blogs.map((b, i) => {
                        return (
                                <div key={i} className={styles.blog}>   
                                    <FadeImage src={"/images/heddalKirkje.jpg"} width={400} height={200}/>
                                    <div className={styles.info}>
                                        <p className={styles.date}>08.04.2024</p> 
                                        <p className={styles.title}>{b}</p> 
                                        <p className={styles.description}>Dette er min beskrivelse på artikler</p> 
                                        <button >Les mer</button>
                                    </div>
                                </div>
                            )
                        })}
                </div>
            </div>
        </div>
    )

}