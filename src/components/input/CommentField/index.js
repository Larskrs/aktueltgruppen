"use client"
import styles from "./style.module.css"
import FadeImage from "@/components/common/LoadingFill"
import dynamic from 'next/dynamic';
import NamedField from "../NamedField/NamedField";
import axios from "axios";
import { useState } from "react";
const UserAvatar = dynamic(() => import('@/components/common/UserAvatar'), { ssr: false });
 
export default function CommentField({
    articleId
}) {

    const [sent, setSent] = useState(false)

    if (sent) {
        return <></>
    }

  return (
    <div className={styles.comment}>
                <div className={styles.inset}>
                    <UserAvatar />
                </div>
                <div className={styles.content}>
                  <NamedField title="Kommenter" lockOnEnter={true} onEnter={async (value) => {

                    const data = {
                        articleId: articleId,
                        text: value
                    }

                    await axios.post("http://localhost/api/articles/comments", data, {
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json;charset=UTF-8",
                        },
                    })

                    setSent(true)

                  }} />
                </div>
            </div>
  )
}
