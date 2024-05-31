"use server"
import Blog from "@/components/cards/Blog"
import styles from "./page.module.css"
import FadeImage from "@/components/common/FadeImage/FadeImage"

export default async function Loading () {

    const blogs = [1,2,3,4,5,6]

    return (
        <>
            <div className={styles.hero} >
                <div className={styles.background}>
                    
                </div>
                <div className={styles.info} style={{background: "var(--background-100)"}}>
                    <h1>Loading</h1>
                    <p className={styles.conclusion}>Loading conclusion...</p>
                </div>
            </div>

            <div className={styles.blogs}>
                <div className={styles.header}>
                    <button>Vis mer</button>
                </div>
            <span className={styles.divider} />
            <div className={styles.grid}>
                {blogs.map((a, i) => {
                    return (
                        <Blog key={i} title={"Laster inn..."} />
                        )
                    })}
                </div>
            </div>
        </>
    )
}