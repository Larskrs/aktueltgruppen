"use server"
import Link from "next/link"
import styles from "./layout.module.css"
import Image from "next/image"
import NavLinks from "@/components/server/NavLinks"
import UserAvatar from "@/components/server/UserAvatar"

export default async function Layout({ children, navlinks }) {


    return (
        <div className={styles.container}>
            <nav className={styles.nav}>

                <Link href={"/"} className={`${styles.logo} white`}>
                    <Image alt="Logo" src={"/aktuelt_icon.svg"} width={42} height={42} />
                </Link>

                <NavLinks />

                <UserAvatar />

            </nav>

            <main className={styles.main}>
                {children}
            </main>

            <footer className={styles.footer}>
                <div className={styles.grid}>
                    <section>
                        <h2>Kontakt Oss</h2>
                    </section>
                    <section>
                        <Image alt={"Aktuelt logo"} style={{objectFit: "contain"}} src={"/aktuelt.svg"} width={200} height={50}/>
                    </section>
                    <section>
                            <Link href={"/"}>Prosjekter</Link>
                            <Link href={"/"}>Tilbud til elever</Link>
                    </section>
                </div>
            </footer>
        </div>
    );
}