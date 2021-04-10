import { NextPageContext } from 'next';
import Head from 'next/head';
import { getAppCookies, verifyToken } from "@lib/middleware/utils";
import styles from '../styles/Home.module.css';
//import { useAuth } from "@contexts/auth";
import { useEffect } from 'react';
import useUser from "@lib/swr-hooks";

export default function Home(props) {

  const { user, isLoading, isError } = useUser();

  //const { logged } = props.returnProps;
  console.log("%cThis will be formatted with blue text", "color: blue");

  if (isLoading) {
    console.log('Spinujem jos ...')
  }
  if (isError) {
    console.log('Pusti me neka grijesim ... ')
  }

  if (user) {
    console.log('Jupi ima usera', user);
  }

  async function neka() {
    const home = await fetch(`http://localhost:3000/api/auth/user`, {});
    const res = await home.json();
    console.log('Responsic > ', res)
  }

  useEffect(() => {
    //neka();
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js/tsx!</a> auth demo
        </h1>

        {!user ?
          <p className={styles.description}>You're not logged in!{' '}</p> :
          <h2>Welcome back, {user.user_name}</h2>
        }

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

    </div>
  )
}


export async function getServerSideProps(context: NextPageContext) {

  /*console.log('Query is => ', context.query);
  const { email } = context.query;
  const myCookie = context.req?.headers.cookie;
  const home = await fetch(`http://localhost:3000/api/auth/user`, {
    headers: {
      cookie: myCookie!
    }
  });
  const res = await home.json();
  console.log('Server responsci > ', res)*/

  const { auth }: any = getAppCookies(context.req);
  const loggedIn: any = auth ? verifyToken(auth) : '';

  let returnProps: any;

  if (loggedIn) {
    returnProps = {
      logged: true,
      user: {
        user_name: loggedIn.user_name,
        email: loggedIn.email,
      }
    }
  } else {
    returnProps = {
      logged: false,
      user: null
    }
  }

  return {
    props: {
      returnProps
    }
  }
}