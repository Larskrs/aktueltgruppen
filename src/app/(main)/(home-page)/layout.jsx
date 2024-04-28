"use client"
import Image from "next/image";
import styles from "./page.module.css";
import {Common } from "@/components";

export default function HomeLayout({
    marquee,
    hero
}) {
  return (
    <main className={styles.main}>
        {hero}
        {marquee}
    </main>
  );
}
