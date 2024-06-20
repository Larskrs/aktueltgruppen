"use server"
import Link from "next/link"
import styles from "./layout.module.css"
import Image from "next/image"
import NavLinks from "@/components/server/NavLinks"
import UserAvatar from "@/components/server/UserAvatar"
import SideBar from "@/components/server/SideBar"
import AcceptTOS from "@/components/AcceptTOS"
import TOSAcceptedWrapper from "@/components/TOSAcceptedWrapper"

export default async function Layout({ children }) {

    return (
        <>
        <TOSAcceptedWrapper hideWhenAccepted={true}>
                <nav className={styles.news}>
                <p>Dette nettstedet er ikke ferdig utviklet! Om du fortsetter godtar du at vi samler inn epost, navn og profilbildet til din google konto om du logger inn under utviklingstid.</p>
                <AcceptTOS>Godta</AcceptTOS>
                </nav>
        </TOSAcceptedWrapper>


        
        
        <div className={styles.container}>
            <nav className={styles.nav}>
                <div>

                <SideBar />

                <NavLinks />

                <UserAvatar />

                </div>
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
        </>
    );
}