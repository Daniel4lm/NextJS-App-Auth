import * as React from "react";
import Head from "next/head";
import { NavBar } from './navbar/NavBar';
import { Footer } from './footer/Footer';
import styles from "@styles/Layout.module.css";

//import links from "../components/menuList";

type LayoutType = {
    children?: React.ReactChild | React.ReactChild[]
}

export const Layout = (props: LayoutType) => {

    return (
        <>
            <Head>
                <link rel="icon" href="/favicon.svg" />
                <meta charSet='utf-8' />
                <meta name='viewport' content='initial-scale=1.0, width=device-width' />
            </Head>
            <div className={styles.layout_content}>
                <NavBar />
                <main style={{flex: "1 1 auto"}}>
                    {props.children}
                </main>
                <Footer />
            </div>
        </>
    );
}