"use client"
import Image from "next/image";
import styles from "./page.module.css"
import Users from "./users"
import { Common, About } from "../../../../components";


export default function About_Page () {
    return (
        <div className={styles.container}>

                <div>
                    <About.Header
                        backdrop={{
                            image: "/images/Lars.jpg",
                        }}
                        user={{
                            name: "Lars Kristian Småge Syvertsen",
                        }}
                        color={{
                            background: "var(--text-900)",
                            primary   : "#ffffff50",
                            text      : "#a83731",
                            subtext   : "#999999",
                            logo      : "transparent"
                        }}
                        stats={{
                            products: 16,
                            tasks: 125,
                            rank: 4,
                            status: "Jævla Scrawny neger"
                        }}
                    />
                    {/* <About.Header
                        backdrop={{
                            image: "/images/bugge.jpg",
                            position: "center"
                        }}
                        color={{
                            background: "#000000",
                            primary   : "#4700f4",
                            text      : "#4700f4",
                            subtext   : "#cccccc",
                            logo      : "transparent"
                        }}
                        user={{
                            name: "Bugge Wesseltoft",
                        }}
                        stats={{
                            products: 2,
                            tasks: 120,
                            rank: 2,
                            status: "Tilbyr ikke åpen chat."
                        }}
                    /> */}
                    {/* <About.Header
                        backdrop={{
                            image: "/images/dome.jpg",
                            position: "center"
                        }}
                        color={{
                            background: "#eb4b1a",
                            primary   : "#aa3410",
                            text      : "#ffffff",
                            subtext   : "#eeeeee",
                            logo      : "transparent"
                        }}
                        user={{
                            name: "Langesund Kirke",
                        }}
                        stats={{
                            products: 16,
                            tasks: 125,
                            rank: 4,
                            status: "Tilbyr ikke åpen chat."
                        }}
                    /> */}
                    {/* <About.Header
                        backdrop={{
                            image: "/images/passion.jpg",
                            position: "center"
                        }}
                        color={{
                            background: "#ffffff",
                            primary   : "#33333350",
                            text      : "#000000",
                            subtext   : "#666666",
                            logo      : "transparent"
                        }}
                        user={{
                            name: "Frus med Fersken & passjonsfrukt",
                        }}
                        stats={{
                            status: "Få ro og smak i hverdagen."
                        }}
                    /> */}
                </div>

                <br style={{marginBlock: "1rem"}} />
                
                <div className={styles.hero}>
                    <div className={styles.image}>
                        <Common.FadeImage src={"/images/WierdLars.jpg"} fill />
                    </div>
                    <div className={styles.image}>
                        <Common.FadeImage src={"/images/HeddalKirkje.jpg"} fill />
                    </div>
                    <div className={styles.image}>
                        <Common.FadeImage src={"/images/Glass.jpg"} fill />
                    </div>
                    <div className={styles.image}>
                        <Common.FadeImage src={"/images/dome.jpg"} fill ></Common.FadeImage>
                    </div>
                    <div className={styles.image}>
                        <Common.FadeImage src={"/images/HeddalKirkje.jpg"} fill style={{objectPosition: "right"}} />
                    </div>
                </div>

                <About.Projects />

                <div className={styles.hero}>
                    <div className={styles.image}>
                        <Common.FadeImage src={"/images/Frus/fizzy.jpg"} fill />
                    </div>
                    <div className={styles.image}>
                        <Common.FadeImage src={"/images/Frus/calm.jpg"} fill />
                    </div>
                    <div className={styles.image}>
                        <Common.FadeImage src={"/images/Frus/passjonsfrukt.jpg"} fill />
                    </div>
                    <div className={styles.image}>
                        <Common.FadeImage src={"/images/Frus/flaske.png"} fill ></Common.FadeImage>
                    </div>
                    <div className={styles.image}>
                        <Common.FadeImage src={"/images/Frus/passion.jpg"} fill style={{objectPosition: "right"}} />
                    </div>
                </div>
                {/* <div className={styles.hero}>
                    <div className={styles.image}>
                        <Common.FadeImage src={"http://aktuelt.tv/api/v1/files?fileId=dfeca617-8314-42ba-a941-021625339c29.JPG"} fill ></Common.FadeImage>
                    </div>
                    <div className={styles.image}>
                        <Common.FadeImage src={"http://aktuelt.tv/api/v1/files?fileId=b3d54b4b-4034-4fd1-9aa3-1333709839aa.jpg"} fill />
                    </div>
                    <div className={styles.image}>
                        <Common.FadeImage src={"http://aktuelt.tv/api/v1/files?fileId=495f3789-08f0-491c-b050-e56876943448.JPG"} fill />
                    </div>
                    <div className={styles.image}>
                        <Common.FadeImage src={"http://aktuelt.tv/api/v1/files?fileId=d8e5e400-ec12-4c7d-babe-3d95ad75d0e7.JPG"} fill />
                    </div>
                    <div className={styles.image}>
                        <Common.FadeImage src={"http://aktuelt.tv/api/v1/files?fileId=20f1b305-c16a-4848-994f-fcf8769ba0eb.jpg"} fill />
                    </div>
                </div> */}

                <Users />
        </div>
    );
}