import Head from "next/head";
import styles from "../styles/Home.module.css";
import Map from "./components/Map";
import fakeStops from "./api/fakeStops.json";
import { useState } from "react";

export type Stop = {
  name: string;
  address: string;
  latLong: number[];
  rating: number;
  description: string;
};

export default function Home() {
  const [currentStopIndex, setCurrentStopIndex] = useState<number>(0);

  return (
    <div className={styles.container}>
      <Head>
        <title>Williamsburg Pizza Crawl</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className={styles.headerContainer}>
          <h1 className={styles.title}>Williamsburg Pizza Crawl</h1>
        </div>

        <div className={styles.content}>
          <div className={styles.descriptorsContainer}>
            <p className={styles.description}>
              Williamsburg, Brooklyn, NYC has perhaps the best square mile of
              pizza in the US, if not the world. Here's a guide to hitting some
              of the best spots in town in just one day.
            </p>
            {fakeStops.map((stop: Stop, i) => (
              <div className={styles.stopContainer}>
                <h1>
                  {i + 1}. {stop.name}
                </h1>
                <p>{stop.description}</p>
              </div>
            ))}
          </div>
          <div className={styles.mapContainer}>
            <Map stops={fakeStops} currentStopIndex={0} />
          </div>
        </div>
      </main>

      <footer>
        <a target="_blank" rel="noopener noreferrer">
          Happy 27th Ryan! Made with 🍕 by Anna
        </a>
      </footer>

      <style jsx>{`
        main {
          padding: 5rem 0 0 0;
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
