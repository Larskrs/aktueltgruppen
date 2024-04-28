"use client"
import styles from "./page.module.css"
import { Input } from "@/components"

export default function Films () {
    return (
        <div className={styles.container}>

                <main className={styles.main}>
                    <Input.NamedField title="Fortell oss litt om deg." />
                    <Input.NamedButton name="Rediger Profil" title="Rediger Profil" description="Endre utsenet på profilen etter hvilke spill du spiller."/>
                    <Input.NamedSwitch title="Offentlig Profil" description="Vil du gjør profilen din synlig for alle? Din profil vil bli synlig i søkemotorer og innlegg kan deles av andre."/>

                    
                </main>

        </div>
    );
}