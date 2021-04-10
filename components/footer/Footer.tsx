import styles from '@styles/Footer.module.css'
import PoweredBy from "./PoweredBy";
export const Footer = () => {

    return (
        <footer className={styles.footer}>
            <span>Copyright © 2021 - </span>
            <a
                href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
            >
                <PoweredBy />
            </a>
        </footer>
    );
}