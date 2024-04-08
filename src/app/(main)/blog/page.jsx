import Image from "next/image"
import styles from "./page.module.css"
import NamedButton from "../../../../components/input/NamedButton/NamedButton"
export default function Blog ({}) {

    const blogs = [
        "1",
        "Hei",
        "Deter litt mye",
        "Deter litt mye",
        "Deter litt mye",
        "Deter litt mye",
        "Deter litt mye",
        "Deter litt mye",
        "Deter litt mye",
        "Let it die, let it die, let it shrivel up and die, cmon everyone.",
    ]

    return (
        <div className={styles.container}>
            <div className={styles.blogs}>
                {blogs.map((b, i) => {
                    return (
                            <div key={i} className={styles.blog}>   
                                <Image src={"/images/passion.jpg"} width={400} height={200}/>
                                <div className={styles.info}>
                                    <p>{b}</p> 
                                    <button >Les</button>
                                </div>
                            </div>
                        )
                    })}
            </div>
        </div>
    )

}