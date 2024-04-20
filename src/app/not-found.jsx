"use client"
import styles from "./not-found.module.css"
import { Common } from "../../components"
import Image from "next/image";
import Link from "next/link";

export default function NotFound () {
    return (
        <div className={styles.container}>
            <Image alt="Not-found image" src={"/icons/404-Symbol.svg"} className={`contrast ${styles.title}`} width={500} height={150} />
            <p className={styles.description}>Vi fant desverre ikke noe aktuelt her...</p>
            <Link href={"/"} className={styles.button}>Hjem</Link>
        </div>
    );
}