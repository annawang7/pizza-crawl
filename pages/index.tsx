import Head from "next/head";
import styles from "../styles/Home.module.css";
import Map from "./components/Map";
import fakeStops from "./api/fakeStops.json";
import { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ArrowSquareOut, MapTrifold } from "@phosphor-icons/react";
import StopContainer from "./components/StopContainer";

export type Stop = {
  name: string;
  address: string;
  latLong: number[];
  rating: number;
  gmapsUrl: string;
  description: string;
};

const cx = classNames.bind(styles);

export default function Home() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrollTop = containerRef.current.scrollTop;
        if (scrollTop > 0) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      }
    };

    if (containerRef.current) {
      containerRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      containerRef.current?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [currentStopIndex, setCurrentStopIndex] = useState<number | null>(null);

  const scrollToStop = (index: number) => {
    const stopElement = document.getElementById(`stop-${index}`);
    if (stopElement) {
      stopElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const setCurrentStopIndexAndScroll = (index: number) => {
    setCurrentStopIndex(index);
    scrollToStop(index);
  };

  return (
    <div className={cx("container", { scrolled })}>
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
              Williamsburg, Brooklyn, NYC has the best square mile of pizza and
              I'm honored to call it home. Here's a tour of some of the best
              spots.
            </div>
            {fakeStops.map((stop: Stop, i) => (
              <StopContainer
                key={stop.name}
                stop={stop}
                index={i}
                currentStopIndex={currentStopIndex}
                setCurrentStopIndex={setCurrentStopIndex}
              />
            ))}
            <div className={styles.description}>
              This site is inspired by Chris Crowley's{" "}
              <a
                href="https://www.grubstreet.com/2022/12/best-pizza-neighborhood-williamsburg-nyc.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                2022 article.
              </a>
            </div>
          </div>
          <div className={`${styles.mapContainer} hidden sm:block`}>
            <Map
              stops={fakeStops}
              currentStopIndex={currentStopIndex}
              setCurrentStopIndex={setCurrentStopIndexAndScroll}
            />
          </div>
        </div>
      </main>
      <footer>
        <Sheet>
          <SheetTrigger asChild>
            <Button className="flex items-center gap-2 hover:bg-[#eeebda] rounded w-full">
              <MapTrifold className="w-5 h-5" /> Open Map
            </Button>
          </SheetTrigger>
          <SheetContent className="!max-w-full w-11/12">
            <div className="flex flex-col h-full font-sans gap-4 pt-5">
              <Map
                stops={fakeStops}
                currentStopIndex={currentStopIndex}
                setCurrentStopIndex={setCurrentStopIndexAndScroll}
              />
              <StopContainer
                stop={fakeStops[currentStopIndex ?? 0]}
                currentStopIndex={currentStopIndex ?? 0}
                index={currentStopIndex ?? 0}
              />
            </div>
          </SheetContent>
        </Sheet>
      </footer>

      <style jsx>{`
        main {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          overflow: scroll;
          padding-bottom: 24px;
          width: 100%;
        }
        footer {
          width: 100%;
          border-top: 1px solid #d3d3d3;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 4px;
          font-size: 12px;

          @media (min-width: 640px) {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
