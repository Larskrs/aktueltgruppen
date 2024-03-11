
import Image from 'next/image';
import styles from './Header.module.css'
import { Common } from '../..';

export default function Header ({
    backdrop={
        image: "http://aktuelt.tv/api/v1/files?fileId=8bde18e4-b041-4cf5-8e8f-d97c99d1609a.jpg",
        position: "center"
    },
    color={
        background: "#000000",
        text: "#ffffff",
        subtext: "#cecece",
        primary: "#3b0100",
        logo   : "transparent"
    },
    user={name:"Joe Swanson Smith"},
    stats={products: 2, tasks: 4, rank: 999, status: "VGS"}


}) {

    return (
        <div className={styles.container}>
            <style jsx global>{`
                :root {
                    --header-background: ${color.background};
                    --header-text: ${color.text};
                    --header-subtext: ${color.subtext};
                    --header-primary: ${color.primary};
                    --header-logo: ${color.logo};
                    --header-image-position: ${backdrop.position};
                }
                `}</style>
            <div className={styles.backdrop}>
                    <div className={styles.user_info}>
                        <h1 className={styles.title}>{user.name}</h1>
                        <div className={styles.stats}>
                        {stats.products          && <p>Produkter <span>{stats.products}</span></p>                          }
                        {stats.tasks             && <p>Oppgaver <span>{stats.tasks}</span></p>                              }
                        {stats.rank              && <p>Rangert <span className={styles.highlighted}>{stats.rank}</span></p> }
                            
                        </div>
                        <p>{stats.status}</p>
                    </div>
                    <div className={styles.backdrop_image}>
                        <div className={styles.gradient} />
                        <Common.FadeImage src={backdrop.image} fill />
                    </div>
            </div>
        </div>
    );
}