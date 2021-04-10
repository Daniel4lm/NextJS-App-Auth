import useUser from "@lib/swr-hooks";
import style from "@styles/NavBar.module.css";
export default function Avatar() {

    const { user, isLoading } = useUser();

    if (isLoading || !user) {
        return null;
    }

    return (
        <div className={style.avatarContainer} >
            <span className={style.avatarTitle} >{user.user_name}</span><Icon />
        </div>
    );
}

function Icon() {
    return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z" fill="#F0F0F0" />
            <path d="M16 17C19.3137 17 22 14.3137 22 11C22 7.68629 19.3137 5 16 5C12.6863 5 10 7.68629 10 11C10 14.3137 12.6863 17 16 17Z" fill="#63A0E8" />
            <path fillRule="evenodd" clipRule="evenodd" d="M26 27.0741C23.4141 29.504 19.8874 31 16 31C12.1126 31 8.58594 29.504 6 27.074C6.52519 23.6611 10.8019 21 16 21C21.1981 21 25.4748 23.6611 26 27.0741Z" fill="#63A0E8" />
        </svg>
    );
}