import styles from "./page.module.css"
import FadeImage from "@/components/common/FadeImage/FadeImage"

export default async function Layout ({
    children,
    featured,
}) {
    return (
        <>
            <div className={styles.container}>


                {featured}

            </div>
        </>
    )
}