"use client"
import { useEffect, useState } from "react"
import styles from "./style.module.css"

export default function Home({children, newsId}) {

  const [seen, setSeen] = useState("")
  useEffect(() => {
    if (localStorage !== undefined)
    setSeen(localStorage.getItem("news_seen"))
  }, [seen])
 

  // When user submits the form, save the favorite number to the local storage
  const saveToLocalStorage = e => {
    localStorage.setItem("news_seen", newsId)
    setSeen(newsId)
  }

  if (seen && seen == newsId) {
      return (<></>)
  } else if (seen == null || seen == "") {
      return (<></>)
  } else {
    return (
      <nav className={styles.news} style={{top: (seen && seen == newsId) ? 0 : "var(--nav-height)"}}>
      {children}
      <form onSubmit={saveToLocalStorage}>
        <button className={styles.button} type="submit" >Skjul</button>
      </form>
    </nav>
    )
  }
}
