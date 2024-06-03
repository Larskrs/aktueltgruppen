"use client"
import styles from "./style.module.css"
import FadeImage from "../../common/FadeImage/FadeImage"
import Link from "next/link"
import { TimeAgo } from "@/lib/relativeTime"

export default function Blog ({
    title="",
    description="",
    img="",
    slug,
    publishedAt,
    preview=false,
    
    onClick=() => {},
}) {
    return (
        <Link href={`/articles/${slug}`} className={styles.blog} onClick={onClick}>   
            <div className={styles.image}>
                {  (new Date() - new Date(publishedAt)) < (24*60*60*1000) && <p className={styles.date}>{TimeAgo(new Date(publishedAt))}</p> }
                <div style={{opacity: preview ? 1 : 0, transition: "1s all"}}>
                    <span style={{animationDelay: "0s", background: "var(--secondary-400)"}} className={styles.preview} />
                    <span style={{animationDelay: "1s", background: "var(--primary-400)"}} className={styles.preview} />
                </div>
                <FadeImage alt={title} src={img} width={320} height={160} quality={50} />
            </div>
            <div className={styles.info}>
                <p className={styles.title}>{title}</p>
                {/* <p className={styles.description}>{description}</p>  */}
            </div>
        </Link>
    )
}
