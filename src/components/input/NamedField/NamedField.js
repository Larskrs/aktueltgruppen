import { useState } from "react";
import styles from "./NamedField.module.css"

export default function NamedField({
    title="Send Dummy Message",
    onChange=(() => {}),
    onEnter=(() => {}),
    resetOnEnter=false,
    lockOnEnter=false,
    disabled=false,
    submitButton=null
}) {

    const [_value, setValue] = useState("");
    const [lockInput, setLockInput] = useState(disabled)

    return (
        <div className={styles.container}>
            {title && <p className={styles.text}>
                {title}
            </p> }
            <div className={styles.row}>

            <div className={styles.field}>
                {/* <label htmlFor="input"></label> */}
                <input disabled={lockInput} id="input" onChange={(e) => {setValue(e.target.value); onChange(e.target.value)}} value={_value} className={styles.input} 
                onKeyDown={((e) => {
                    if (e.key === "Enter") {
                        if (_value === "") { return }
                        onEnter(_value)
                        if (resetOnEnter) setValue("")
                        if (lockOnEnter) setLockInput(true)
                    }
                })} />
                <div>
                {_value.split(" ").map((word, i) => {
                    return <span key={i} className={styles.word}>{word}</span>   
                })}
                    <div className={styles.indicator}>
                        <span />
                        <span />
                        <span />
                    </div>
                </div>
                
            </div>

            {submitButton &&
                <button className={styles.button} onClick={() => {
                    if (_value === "") { return }
                    onEnter(_value)
                    if (resetOnEnter) setValue("")
                    if (lockOnEnter) setLockInput(true)
                }}>
                    {submitButton}
                </button>
            }

            </div>
        </div>
    );
}

