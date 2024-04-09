import Image from "next/image"
import styles from "./page.module.css"
import Blog from "../../../../components/cards/Blog"
export default function BlogPage ({}) {

    const blogs = [
        {
            title: "The Muppets har funnet en ny stjerne.",
            description: "Johanne engrav skal spille Beaker i den nye Muppets filmen: The Beaker : 2075",
            img: "/images/debug/the-muppets-2.png",
        },
        {
            title: "Daniel så noe helt genialt.",
            description: "Daniel: Gerregud, det er jo så smart...",
            img: "/images/debug/image.png",
        },
        {
            title: "Denne oppskriften fikk Toffer med i demokratene.",
            description: "Toffer endret meningene sine med en gang han fikk småge på disse.",
            img: "/images/debug/bakt_potet.jpg"
        },
        {
            title: "Aktuelt møter kritikk på skytebane.",
            description: "Daniel mister sjangsen på jegerprøven etter uheldig sylting.",
            img: "/images/debug/war_never_changes.png",
        },
        {
            title: "Olav har aldri spist en så god frokostblanding før!",
            description: "Daniel legger hasj og kokain i frokostblandingen til Olav. Timer senere hopper han ut av et fly til New York.",
            img: "/images/debug/olav_faller.png",
        }, 
        {
            title: "Kommer DBL til å bli lagd?",
            description: "Daniel: Ja din stygge jøger, hold kjeft og dø, du vet ingenting.",
            img: "/images/debug/trist_dan.jpg"
        },
        {
            title: "Lars flyttet ut av fuktig gruve i Skien",
            description: "I flere år nå har Lars Kristian bodd i parkeringsgruven i under arkaden parkering. Nå skal han endelig ut igjen.",
            img: "/images/debug/oog_lars.png",
        },
        {
            title: "Lucas er Batman",
            description: "Endelig er drømmen i oppfyllelse, nå skal han spille batman i den nye generasjonens adopsjon.",
            img: "/images/debug/luba_batman.png"
        }
    ]

    return (
        <div className={styles.container}>
            <div className={styles.blogs}>
                    <div className={styles.header}>
                        <h3>Artikler</h3>
                        <button>Vis mer</button>
                    </div>
                <span className={styles.divider} />
                <div className={styles.grid}>
                    {blogs.map((b, i) => {
                        return (
                                <Blog key={i} {...b} />
                            )
                        })}
                </div>
            </div>
        </div>
    )

}