import Image from "next/image";
import styles from "./page.module.css"
import Users from "./users"

export default function About () {
    return (
        <div className={styles.container}>
                <div className={styles.hero}>
                    <div className={styles.details}>
                    </div>
                    <div className={styles.image}>
                        <Image src={"http://aktuelt.tv/api/v1/files?fileId=6ae7ec9b-9bf9-4032-baa3-c0b3f96e172b.JPG"} fill />
                    </div>
                </div>

                <Users />
        </div>
    );
}