"use server"
import Blog from "@/components/cards/Blog"
import styles from "./page.module.css"
import FadeImage from "@/components/common/FadeImage/FadeImage"


async function getArticles() {
    const res = await fetch(`http://localhost/api/articles`)
    return res.json()
  }

export default async function Featured () {

    const articles = await getArticles()


    return (
        <>
            <div className={styles.hero} >
                <div className={styles.background}>
                    {articles[0]?.video
                        ?   <video  autoPlay playsInline muted controls>
                                <source src={articles[0]?.video} type="video/mp4"></source>
                            </video>
                        : <FadeImage src={articles[0]?.img} width={1200} height={600} />
                    }
                </div>
                <div className={styles.info}>
                    <h1>{articles[0]?.title}</h1>
                    <p className={styles.conclusion}>{articles[0]?.conclusion}</p>
                </div>
            </div>

            <div className={styles.blogs}>
                <div className={styles.header}>
                    <h3>Artikler</h3>
                    <button>Vis mer</button>
                </div>
                <span className={styles.divider} />
                <div className={styles.grid}>
                    {articles.map((a, i) => {
                        return (
                            <Blog key={i} {...a} />
                            )
                        })}
                </div>
            </div>
        </>
    )
}