
import Image from 'next/image';
import styles from './Header.module.css'
import FadeImage from '../../common/FadeImage/FadeImage';

export default function Header ({
    backdrop={
        image: "http://aktuelt.tv/api/v1/files?fileId=8bde18e4-b041-4cf5-8e8f-d97c99d1609a.jpg",
        color: "#000000"
    },
    user={name:"Joe Swanson Smith"},
    stats={products: 2, tasks: 4, rank: 999, status: "VGS"}
}) {
    return (
        <div className={styles.container}>
            <style jsx global>{`
                :root {
                    --header-color: ${backdrop.color}
                }
                `}</style>
            <div className={styles.backdrop}>
                    <div className={styles.user_info}>
                        <h1 className={styles.title}>{user.name}</h1>
                        <div className={styles.stats}>
                            <p>Produkter <span>{stats.products}</span></p>
                            <p>Oppgaver <span>{stats.tasks}</span></p>
                            <p>Rangert <span style={{background: "#fff", padding: "4px 8px", borderRadius: 8, color: "var(--header-color)"}}>#{stats.rank}</span></p>
                            
                        </div>
                        <p><span style={{background: "#fff", padding: "4px 8px", marginTop: 8, borderRadius: 8, color: "var(--header-color)"}}>{stats.status}</span></p>
                    </div>
                    <div className={styles.backdrop_image}>
                        <div className={styles.gradient} />
                        <FadeImage src={backdrop.image} fill />
                    </div>
            </div>
        </div>
    );
}