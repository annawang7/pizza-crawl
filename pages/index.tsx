import Head from "next/head";
import styles from "../styles/Home.module.css";
import Map from "./components/Map";
import fakeStops from "./api/fakeStops.json";
import { useEffect, useRef, useState } from "react";
import { Paytone_One, Libre_Baskerville } from "next/font/google";
import classNames from "classnames/bind";

const titleFont = Paytone_One({ weight: "400", subsets: ["latin"] });
const bodyFont = Libre_Baskerville({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export type Stop = {
  name: string;
  address: string;
  latLong: number[];
  rating: number;
  description: string;
};

const cx = classNames.bind(styles);

export default function Home() {
  const [currentStopIndex, setCurrentStopIndex] = useState<number>(0);
  const containerRef = useRef(null);
  const [scrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = containerRef.current.scrollTop;
      if (scrollTop > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    if (containerRef.current) {
      containerRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      containerRef.current.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [hoveredStopIndex, setHoveredStopIndex] = useState<number | null>(null);

  return (
    <div className={cx("container", bodyFont.className)}>
      <Head>
        <title>Williamsburg Pizza Crawl</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className={cx("headerContainer", { scrolled })}>
          <h1 className={cx("title", { scrolled })}>
            Williamsburg Pizza Crawl
          </h1>
        </div>
        <div ref={containerRef} className={styles.content}>
          <div className={styles.descriptorsContainer}>
            <div className={styles.description}>
              Williamsburg, Brooklyn, NYC has perhaps the best square mile of
              pizza in the US, if not the world. Here's a guide to hitting some
              of the best spots in town in just one day.
            </div>
            {fakeStops.map((stop: Stop, i) => (
              <div
                className={cx("stopContainer", {
                  hovered: hoveredStopIndex === i,
                })}
                key={stop.name}
                onMouseEnter={() => setHoveredStopIndex(i)}
                onMouseLeave={() => setHoveredStopIndex(null)}
              >
                <h2>
                  {i + 1}. {stop.name}
                </h2>
                <div>
                  <b>Address: </b>
                  {stop.address}
                </div>
                <p>{stop.description}</p>
              </div>
            ))}
            <div className={styles.description}>
              If you have any suggestions for this list, let me know!
            </div>
          </div>
          <div className={styles.mapContainer}>
            <Map stops={fakeStops} currentStopIndex={hoveredStopIndex} />
          </div>
        </div>
      </main>

      <footer>Happy 27th Ryan! Made with 🍕 by Anna</footer>

      <style jsx>{`
        main {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          overflow: scroll;
          padding-bottom: 24px;
        }
        footer {
          width: 100%;
          height: 24px;
          border-top: 1px solid #d3d3d3;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 4px;
          font-size: 12px;
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
