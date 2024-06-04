"use client"
import styles from "./style.module.css"
import FadeImage from "@/components/common/LoadingFill"
import Comment from "../../cards/Comment"
import dynamic from 'next/dynamic';
import NamedField from "../NamedField/NamedField";
import axios from "axios";
import { useState } from "react";
const UserAvatar = dynamic(() => import('@/components/common/UserAvatar'), { ssr: false });
 
export default function CommentField({
    articleId
}) {

    const [sent, setSent] = useState(false)
    const [res, setRes] = useState(null)

    if (res) {
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

                    const _res = await axios.post("/api/articles/comments", data, {
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json;charset=UTF-8",
                        },
                    })
                    console.log({_res})
                    setRes(_res.data)

                    setSent(true)

                  }} />
                </div>
            </div>
  )
}
