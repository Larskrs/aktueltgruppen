"use client"
import Blog from "@/components/cards/Blog"
import styles from "./page.module.css"
import FadeImage from "@/components/common/FadeImage/FadeImage"
import useSWR from "swr"

const fetcher = (...args) => fetch(...args).then((response) => response.json())


export default function Featured () {

    const { data, error, isLoading } = useSWR('/api/articles', fetcher)

    if (error) return <div>Failed to load</div>
    if (data)
    return (
        <>
            <div className={styles.hero} >
                <div className={styles.background}>
                    {data[0]?.video
                        ?   <video  autoPlay playsInline muted controls>
                                <source src={data[0]?.video} type="video/mp4"></source>
                            </video>
                        : <FadeImage src={data[0]?.img} width={1200} height={600} />
                    }
                </div>
                <div className={styles.info}>
                    <h1>{data[0]?.title}</h1>
                    <p className={styles.conclusion}>{data[0]?.conclusion}</p>
                </div>
            </div>

            <div className={styles.blogs}>
                <div className={styles.header}>
                    <h3>Artikler</h3>
                    <button>Vis mer</button>
                </div>
                <span className={styles.divider} />
                <div className={styles.grid}>
                    {data.map((a, i) => {
                        return (
                            <Blog key={a.id} {...a} />
                            )
                        })}
                </div>
            </div>
        </>
    )
}