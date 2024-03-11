
import Image from 'next/image';
import styles from './Projects.module.css'
import { Common } from '../..';

export default function Projects ({

}) {

    return (
        <div className={styles.container}>
            <style jsx global>{`
                :root {

                }
                `}</style>
            
            <div className={styles.wrap}>
                <h3>Nytt fra denne brukeren</h3>
                <p>Er på tur i Norge, kos dere.</p>
            </div>

        </div>
    );
}