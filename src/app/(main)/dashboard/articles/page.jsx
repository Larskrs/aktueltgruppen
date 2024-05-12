"use client"
import Blog from "@/components/cards/Blog"
import styles from "./page.module.css"
import FadeImage from "@/components/common/FadeImage/FadeImage"
import useSWR from "swr"
import Image from "next/image"
import Link from "next/link"

const fetcher = (...args) => fetch(...args).then((response) => response.json())

export default function ArticlePage () {

    const { data, error, isLoading } = useSWR('/api/articles', fetcher)

    if (error) return <div>Failed to load</div>
    if (data)
    return (
        <>
                <div>
                    <table className={styles.articles}>
                        <thead>
                            <tr>
                                <th>Artikkel</th>
                                <th>Konklusjon</th>
                                <th>Visninger</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((a, i) => {
                                return (
                                    <tr key={a.id}>
                                        <td className={styles.article}>
                                            <Image src={a.img} alt={a.title + " image"} width={120} height={68} />
                                            <div className={styles.column}>
                                                <Link href={`/dashboard/articles/edit?a=${a.id}`}>{a.title}</Link>
                                                <p>{a.conclusion}</p>
                                            </div>
                                        </td>
                                        <td>{a.title}</td>
                                        <td>{a.description}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
        </>
    )
}