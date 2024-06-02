  "use client"
import useSWR from "swr"
import styles from "./page.module.css"
import FadeImage from "@/components/common/FadeImage/FadeImage"
import LoadingFill from "@/components/common/LoadingFill"
import Link from "next/link"

const fetcher = (...args) => fetch(...args).then((response) => response.json())

export default function Page({ params }) {
    
    const { data, error, isLoading } = useSWR(`/api/articles/${params.slug}`, fetcher)

    if (!data) {
      return <div className={styles.container}>
      <div className={styles.article}>
          <Link className={styles.back} href={"/articles"}>Tilbake</Link>
          <div className={styles.header}>
            <div className={styles.image}>
              <LoadingFill />
            </div>
            <h1 style={{width: 600, height: 60}}><LoadingFill /></h1>
            <p className={styles.conclusion}></p>
          </div>

      </div>
    </div>
    }
    return <div className={styles.container}>
        <div className={styles.article}>
          <Link className={styles.back} href={"/articles"}>Tilbake</Link>
            <div className={styles.header}>
              <div className={styles.image}>
                <FadeImage src={data.img} fill sizes="800px" />
              </div>
              <h1>{data.title}</h1>
              <p className={styles.conclusion}>{data.conclusion}</p>

              <div className={styles.body}>{data.body}</div>

            </div>

        </div>
      </div>
  }