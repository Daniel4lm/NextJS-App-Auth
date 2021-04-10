import { useRouter } from 'next/router';
import * as React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Image from "next/image";
import styles from "@styles/About.module.css";

interface AboutType {
    title: string;
    text: string;
    children?: React.ReactChild | React.ReactChild[]
}

const AboutPage = ({ title = 'About me', text = 'This is a section about me', children }: AboutType) => {


    return (
        <div className={styles.about_container} >

            <div className={styles.about_header} >
                <div className={styles.pic_wrapper} >
                    <div className={styles.photo} >
                        <Image className={styles.photo}  src='/my-pic.jpg' alt='Author - Just me' layout='fill'/>
                    </div>                    
                </div>
                <span>Daniel Molnar</span>
            </div>

            <div className={styles.about_section}>
                <Head>
                    <title>{title}</title>
                    <meta charSet='utf-8' />
                    <meta name='viewport' content='initial-scale=1.0, width=device-width' />
                </Head>
                <p className={styles.descrpt}>{text}</p>
                <h3>About DEV</h3>
                <p>
                    DEV is a community of software developers getting together to help one another out. The software industry relies on collaboration and networked learning. We provide a place for that to happen.
            </p>
                <p>
                    Our application is open source, meaning you can inspect every little detail of the code, or chip in yourself! We are working to make our platform available for anyone to stand up similar communities in any niche or passion.
            </p>
                <p>
                    We believe in transparency and adding value to the ecosystem. We hope you poke around and like what you see!
            </p>
                <p>Happy coding ❤️</p>

                <Link href="/"><a className={styles.link}>
                    Back to home<span className={styles.tag_arrow} >&rarr;</span></a></Link>

                {children}
            </div>

        </div>
    );
}

export default AboutPage;