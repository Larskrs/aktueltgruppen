"use client"
import Link from "next/link";
import styles from "./page.module.css"
import { usePathname } from "next/navigation";

const navLinks = [,
    { name: "Om oss", href: "/about"} ,
    { name: "Artikler", href: "/blog"} ,
    { name: "Chat", href: "/chat"} ,
]

export default function NavLinks({ children }) {

    const pathname = usePathname()

    return (

        <>
            {navLinks.map((link) => {
                const isActive = pathname.startsWith(link.href)

                return (
                    <Link key={link.name} href={link.href}
                    className={isActive ? styles.active : styles.inactive}
                    >
                    {link.name}
                </Link>
                )
            })}
        </>

    );
}