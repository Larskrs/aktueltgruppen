"use server"
import { auth, signIn, signOut } from "@/auth"
import styles from "./style.module.css"
import Image from "next/image"
 
export default async function UserAvatar() {
  const session = await auth()
 
  if (!session) return <></>
 
  return (
    <>
      <div className={styles.avatar}>
        <Image width={32} height={32} quality={50} src={session?.user?.image} alt="User Avatar" />
      </div>
    </>
  )
}