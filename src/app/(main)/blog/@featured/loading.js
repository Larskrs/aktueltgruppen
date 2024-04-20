"use client"
import Blog from "@/components/cards/Blog"
import useFetch from "@/hooks/useFetch"
import { useEffect, useState } from "react"
import styles from "./page.module.css"
import FadeImage from "@/components/common/FadeImage/FadeImage"

export default function Loading () {

    const blogs = [1,2,3]

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
                    <h3>Artikler</h3>
                    <button>Vis mer</button>
                </div>
            <span className={styles.divider} />
            <div className={styles.grid}>
                {blogs.map((a, i) => {
                    return (
                        <Blog key={i} title={"Laster inn..."} preview={focus == i} onClick={() => {setFocus(i)}} />
                        )
                    })}
                </div>
            </div>
        </>
    )
}