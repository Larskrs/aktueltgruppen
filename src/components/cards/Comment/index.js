"use client"
import styles from "./style.module.css"
import FadeImage from "../../common/FadeImage/FadeImage"
import { TimeAgo } from "@/lib/relativeTime"

export default function Blog ({
    user,
    createdAt,
    id,
    text
}) {

    return (
            <div className={styles.comment}>
                <div className={styles.inset}>
                    <FadeImage alt={`User: ${user.name}'s Profile Picture`} width={32} height={32} src={user.image} />
                </div>
                <div className={styles.content}>
                  <div className={styles.row}>
                    <p className={styles.username}>{user.name}</p>
                    <p className={styles.date}>{TimeAgo(new Date(createdAt))}</p>
                  </div>
                  
                  <p className={styles.message}>{text}</p>
                </div>
            </div>
    )
}
