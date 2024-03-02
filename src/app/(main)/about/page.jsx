"use client"
import Image from "next/image";
import styles from "./page.module.css"
import Users from "./users"
import { Common, About } from "../../../../components";


export default function About_Page () {
    return (
        <div className={styles.container}>

                <div>
                    {/* <About.Header
                        backdrop={{
                            image: "http://aktuelt.tv/api/v1/files?fileId=64d56819-41b6-4917-bc27-b1011939bdeb.JPG",
                            color: "#4d5051"
                        }}
                        user={{
                            name: "Levin Winther Tjønnås",
                        }}
                        stats={{
                            products: 16,
                            tasks: 125,
                            rank: 4
                        }}
                    /> */}
                    {/* <About.Header
                        backdrop={{
                            image: "http://aktuelt.tv/api/v1/files?fileId=a67bbd63-01b9-4a23-a29f-9d943575a0d9.JPG",
                            color: "#494540"
                        }}
                        user={{
                            name: "Eirik Hormo Nomme",
                        }}
                        stats={{
                            products: 16,
                            tasks: 125,
                            rank: 4
                        }}
                    /> */}
                    <About.Header
                        backdrop={{
                            image: "http://aktuelt.tv/api/v1/files?fileId=1455186b-f929-42e1-82f7-2b49e2c78ed0.JPG",
                            color: "#000"
                        }}
                        user={{
                            name: "Lars Kristian Småge Syvertsen",
                        }}
                        stats={{
                            products: 16,
                            tasks: 125,
                            rank: 4,
                            status: "Ansatt i Aktuelt Studio"
                        }}
                    />
                    {/* <About.Header
                        backdrop={{
                            image: "http://aktuelt.tv/api/v1/files?fileId=bcafaea4-a6eb-422d-93cc-ba1fb4acdad6.jpeg",
                            color: "#2b3919"
                        }}
                        user={{
                            name: "Julius den femte",
                        }}
                        stats={{
                            products: "2 bananer",
                            tasks: 2,
                            rank: 1,
                            status: "Kristiansand Dyrepark"
                        }}
                    /> */}
                </div>


                
                <div className={styles.hero}>
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
                </div>

                <Users />
        </div>
    );
}