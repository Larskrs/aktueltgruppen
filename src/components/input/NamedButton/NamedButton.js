import styles from "./NamedButton.module.css"

export default function NamedButton({
    title="Send Dummy Message",
    description="A dummy message will be sent to a random reciever. Be careful of who you give this power.",
    name="Send inn."
}) {
    return (
        <div className={styles.container}>
            <div className={styles.text}>
                <span className={styles.title}>{title}</span>
                <p className={styles.description}>{description}</p>
            </div>
            <button className={styles.button}>{name}</button>
        </div>
    );
}