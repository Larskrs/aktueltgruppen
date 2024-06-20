"use server"
import { auth, signIn, signOut } from "@/auth"
import styles from "./style.module.css"
import Image from "next/image"
 
export default async function UserAvatar() {
  const session = await auth()
 
  if (!session) return (
    <form className={styles.sign_in}
      action={async () => {
        "use server"
        await signIn()
      }}
    >
      <button type="submit">Sign in</button>
    </form>
  )
 
  return (
    <>
    
      <div className={styles.user_icon}>
        <Image fill src={session?.user?.image} alt="User Avatar" />
      </div>
      

      <form className={styles.sign_in}
      action={async () => {
        "use server"
        await signOut()
      }}
    >
      <button type="submit">Sign out</button>
    </form>
    </>
  )
}