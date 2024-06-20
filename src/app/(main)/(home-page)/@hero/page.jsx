import Image from "next/image"
import styles from "./page.module.css"

export default function Hero () {
    return (
            <div className={styles.container}>
                 <div className={styles.grid}>
                    <div className={styles.title}>
                        <h1>Gjør din virksomhet <span>Aktuell.</span></h1>
                        <p><span className={styles.inset}></span>Finn ut hvordan vi kan skille deg og din virksomhet ut fra resten.</p>
                        <button className={styles.action}>Se Løsninger</button>
                    </div>
                    <div className={styles.lts}>
                        <section>
                            <h2>Sommerpriser</h2>
                            <p>Service kostnadder er lavere i sommer og vi har kortere kø.</p>
                            <button className={styles.action}></button>
                        </section>
                    </div>
                    <div className={styles.creator}>
                        <section>
                            <Image fill src={"http://aktuelt.tv/_next/image?url=%2Fimages%2Fdebug%2Ftrist_dan.jpg&w=828&q=75"} />
                        </section>
                    </div>
                    <div className={styles.clt}>
                        <section>
                            <Image fill src={"http://aktuelt.tv/api/files?fileId=IMG_2909.jpg"} />
                        </section>
                    </div>
                    <div className={styles.head}>
                        <section>
                            <Image fill src={"http://aktuelt.tv/api/files?fileId=trompet.jpg"} />
                        </section>
                    </div>
                    <div className={styles.info}>
                        <section>
                            <Image fill src={"http://aktuelt.tv/_next/image?url=%2Fimages%2Fdebug%2Ftrist_dan.jpg&w=828&q=75"} />
                        </section>
                    </div>
                 </div>
            </div>
    )
}