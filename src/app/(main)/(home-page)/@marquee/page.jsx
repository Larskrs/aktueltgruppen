"use client"

import styles from "./page.module.css"
import FadeImage from "@/components/common/FadeImage/FadeImage"

export default function Marquee () {

    const companies = [
        {
            name: "Røde Kors Telemark",
            logo: "/logo/companies/røde-kors-logo.png"
        },
        {
            name: "Storm ballklubb",
            logo: "/logo/companies/storm_ballklubb.png"
        },
        
    ]


    return (
        <div className={styles.marquee}>
                <div className={styles.marquee_content}>
                        {companies.map((c, i) => {
                            return (
                                <FadeImage key={i} src={c.logo} width={200} height={50} />
                            )
                        })}
                </div>
                <div className={styles.marquee_content}>
                        {companies.map((c, i) => {
                            return (
                                <FadeImage key={i} src={c.logo} width={200} height={50} />
                            )
                        })}
                    
                </div>
            </div>
    )

}