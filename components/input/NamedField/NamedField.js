import { useState } from "react";
import styles from "./NamedField.module.css"

export default function NamedField({
    title="Send Dummy Message",
    onChange=(() => {}),
    onEnter=(() => {}),
    resetOnEnter=false,
}) {

    const [_value, setValue] = useState("");

    return (
        <div className={styles.container}>
            <p className={styles.text}>
                {/* {title} */}

            </p>
            <div className={styles.field}>
                <label htmlFor="input"></label>
                <input id="input" onChange={(e) => {setValue(e.target.value); onChange(e.target.value)}} value={_value} className={styles.input} 
                onKeyDown={((e) => {
                    if (e.key === "Enter") {
                        onEnter()
                        if (resetOnEnter) setValue("");
                    }
                })} />
                <p>
                    {_value.split(" ").map((word, i) => {
                        return <span key={i} className={styles.word}>{word}</span>   
                    })}
                    <div className={styles.indicator}>
                        <span />
                        <span />
                        <span />
                    </div>
                </p>
                
            </div>
            <p></p>
        </div>
    );
}