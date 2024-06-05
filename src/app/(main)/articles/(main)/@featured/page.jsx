"use client"
import Blog from "@/components/cards/Blog"
import styles from "./page.module.css"
import FadeImage from "@/components/common/FadeImage/FadeImage"
import useSWR from "swr"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"

const fetcher = (...args) => fetch(...args).then((response) => response.json())


export default function Featured () {

    const { data, error, isLoading } = useSWR('/api/articles', fetcher)
    
    const [current, setCurrent] = useState(0)

    if (error) return <div>Failed to load</div>
    if (data)
    return (
        <>
            <div className={styles.hero}>
                <div className={styles.background}>
                    {data[current]?.video
                        ?   <video  autoPlay playsInline muted controls>
                                <source src={data[current]?.video} type="video/mp4"></source>
                            </video>
                        : <FadeImage src={data[current]?.img} fill sizes="800px" />
                    }
                    <div className={styles.widget}>
                        {data.map((a, i) => {
                            return (
                                <span style={current == i ? {width: 100, background: "var(--background-600)"} : {width: 48}} className={styles.blob} onClick={() => {setCurrent(i)}} key={a.id} >
                                    <FadeImage src={a.img} fill quality={10} sizes="100px" />
                                </span>
                            )
                        })}
                    </div>
                </div>
                <div className={styles.info}>
                    <h1>{data[current]?.title}</h1>
                    <p className={styles.conclusion}>{data[current]?.conclusion}</p>
                    <p>Kommentarer: {data[current]._count.comments}</p>
                    <Link className={styles.readMore} href={`/articles/${data[current].slug}`}>Les Mer</Link>
                </div>
            </div>

            <div className={styles.blogs}>
                <div className={styles.header}>
                    <h3>Artikler</h3>
                    <button>Vis mer</button>
                </div>
                <span className={styles.divider} />
                <div className={styles.grid}>
                    {data && data.map((a, i) => {
                        return (
                            <Blog key={a.id} {...a} />
                            )
                        })}
                </div>
            </div>
        </>
    )
}