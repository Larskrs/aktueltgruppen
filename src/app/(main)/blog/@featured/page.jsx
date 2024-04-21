"use client"
import Blog from "@/components/cards/Blog"
import useFetch from "@/hooks/useFetch"
import { Suspense, useEffect, useState } from "react"
import styles from "./page.module.css"
import FadeImage from "@/components/common/FadeImage/FadeImage"

export default function Featured () {

    const {data, error, isLoading, refetch} = useFetch("/api/articles", true )
    const [focus, setFocus] = useState(0)

    return (
        <Suspense >
            <div className={styles.hero} >
                <div className={styles.background}>
                    {data[focus]?.video
                        ?   <video  autoPlay playsInline muted controls>
                                <source src={data[focus]?.video} type="video/mp4"></source>
                            </video>
                        : <FadeImage src={data[focus]?.img} width={1200} height={600} />
                    }
                </div>
                <div className={styles.info}>
                    <h1>{data[focus]?.title}</h1>
                    <p className={styles.conclusion}>{data[focus]?.conclusion}</p>
                </div>
            </div>

            <div className={styles.blogs}>
                <div className={styles.header}>
                    <h3>Artikler</h3>
                    <button>Vis mer</button>
                </div>
                <span className={styles.divider} />
                <div className={styles.grid}>
                    {!isLoading && data.map((a, i) => {
                        return (
                            <Blog key={i} {...a} preview={focus == i} onClick={() => {setFocus(i)}} />
                            )
                        })}
                </div>
            </div>
        </Suspense>
    )
}