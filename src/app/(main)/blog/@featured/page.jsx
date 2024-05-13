"use client"
import Blog from "@/components/cards/Blog"
import styles from "./page.module.css"
import FadeImage from "@/components/common/FadeImage/FadeImage"
import useSWR from "swr"
import { useEffect, useState } from "react"

const fetcher = (...args) => fetch(...args).then((response) => response.json())


export default function Featured () {

    const { data, error, isLoading } = useSWR('/api/articles', fetcher)
    
    const [current, setCurrent] = useState(0)
    const timeBetweenArticles = 6
    const [timeLeft, setTimeLeft] = useState(timeBetweenArticles);
    const [isViewing, setIsViewing] = useState(false)

    useEffect(() => {
        if (isViewing) return
      // exit early when we reach 0
      if (!timeLeft) {
        setTimeLeft(timeBetweenArticles)
        let next = current + 1
        if (next > data.length -1) {
            next = 0;
        }
        setCurrent(next)
      };
  
      // save intervalId to clear the interval when the
      // component re-renders
      const intervalId = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
  
      // clear interval on re-render to avoid memory leaks
      return () => clearInterval(intervalId);
      // add timeLeft as a dependency to re-rerun the effect
      // when we update it
    }, [timeLeft, current, isViewing]);

    if (error) return <div>Failed to load</div>
    if (data)
    return (
        <>
            <div className={styles.hero} onMouseEnter={() => setIsViewing(true)} onMouseLeave={() => setIsViewing(false)} >
                <div className={styles.background}>
                    {data[current]?.video
                        ?   <video  autoPlay playsInline muted controls>
                                <source src={data[current]?.video} type="video/mp4"></source>
                            </video>
                        : <FadeImage src={data[current]?.img} fill />
                    }
                    <div className={styles.widget}>
                        {data.map((a, i) => {
                            return (
                                <span style={current == i ? {width: 75} : {width: 25}} className={styles.blob} onClick={() => {setCurrent(i), setTimeLeft(timeBetweenArticles)}} key={a.id} >
                                    {current == i && <span style={{right: (timeLeft-1) / (timeBetweenArticles) * 75}} className={styles.slider}></span> }
                                </span>
                            )
                        })}
                    </div>
                </div>
                <div className={styles.info}>
                    <h1>{data[current]?.title}</h1>
                    <p className={styles.conclusion}>{data[current]?.conclusion}</p>
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