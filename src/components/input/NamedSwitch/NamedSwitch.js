import { useState } from "react";
import styles from "./NamedSwitch.module.css"

export default function NamedSwitch({
    title="Send Dummy Message",
    description="A dummy message will be sent to a random reciever. Be careful of who you give this power.",
    defaultValue=false,
    value=defaultValue,
    onChange=((value) => {})
}) {

    const [_value, setValue] = useState(value);

    return (
        <div className={styles.container}>
            <div className={styles.text}>
                <span className={styles.title}>{title}</span>
                <p className={styles.description}>{description}</p>
            </div>
            <div className={styles.switch}>
                <span className={_value ? styles.active : styles.unactive} />
                <span onClick={() => {const v = !_value; setValue(v); onChange(v)}} className={styles.detection} />
            </div>
        </div>
    );
}