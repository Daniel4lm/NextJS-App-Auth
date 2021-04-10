import Link from 'next/link';
import Avatar from '@components/avatar/Avatar';
import useUser from "@lib/swr-hooks";

import styles from '@styles/NavBar.module.css'

type NavLinks = {
    links?: {
        page?: string,
        link?: string,
        label: string
    }[]
}

export const NavBar = ({ links = [] }: NavLinks) => {

    const { user, isLoading } = useUser();

    /*
    const setActiveLink = (url) => {
        dispatch({
            type: 'SET_ACTIVE_PAGE',
            payload: url
        })
    }

    const renderLinks = () => (
        links.map(link => {
            if (link.page) {
                const isActive = link.page === state.activePage;
                return (
                    <li key={link.page}
                        onClick={() => console.log(link.page)}>
                        <Link href={link.page}>
                            <a className={isActive ? `${styles.navbar_link} ${styles.active_link}` : `${styles.navbar_link}`}>
                                {link.label}
                            </a>
                        </Link>
                    </li>
                );
            } else if (link.link) {
                return (
                    <li key={link.link}>
                        <a href={link.link} className={styles.navbar_link}>{link.label}</a>
                    </li>
                )
            }
            return;
        })
    );*/

    return (
        <>
            <nav className={styles.navbar}>
                <span className={styles.nav_brand}>
                    <Link href='/'>
                        <a>daniel.molnar</a>
                    </Link>
                </span>

                <ul className={styles.links}>

                    <Link href='/about'>
                        <a className={styles.navbar_link}>About</a>
                    </Link>

                    {isLoading || !user ?
                        <Link href='/login'>
                            <a className={styles.authBtn}>Login</a>
                        </Link>
                        :
                        <a className={styles.authBtn}>Log out</a>
                    }
                    <Avatar />
                </ul>
            </nav>
        </>
    );
} // {renderLinks()}

function BrandLogo() {

    return (
        <svg width="34" height="34" viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid meet"
        >
            <path d="M4 17C2 17 1 18.5 1 20C1 23.5 6 24 6 20V2L10.5 11L15 2V15C20 15 22.5 12.5 22.5 8.5C22.5 4.5 20 2 17 2"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round" />
        </svg>
    );
}
