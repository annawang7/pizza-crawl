import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Williamsburg Pizza Crawl</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div>
          <h1 className={styles.title}>Williamsburg Pizza Crawl</h1>

          <p className={styles.description}>
            Williamsburg, Brooklyn, NYC has perhaps the best square mile of
            pizza in the US, if not the world. Here's a guide to hitting some of
            the best spots in town in just one day.
          </p>
        </div>

        <div className={styles.content}>
          <div className={styles.descriptorsContainer}></div>
          <div className={styles.mapContainer}>This is a map</div>
        </div>
      </main>

      <footer>
        <a target="_blank" rel="noopener noreferrer">
          Made with pizza by Anna Wang
        </a>
      </footer>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 50px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
