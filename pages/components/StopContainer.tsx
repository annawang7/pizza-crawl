import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowSquareOut } from "@phosphor-icons/react";
import classNames from "classnames/bind";
import styles from "styles/Home.module.css";
import { Stop } from "..";

const cx = classNames.bind(styles);

interface StopContainerProps {
  stop: Stop;
  index: number;
  currentStopIndex: number | null;
  setCurrentStopIndex?: (index: number | null) => void;
}

const StopContainer: React.FC<StopContainerProps> = ({
  stop,
  index,
  currentStopIndex,
  setCurrentStopIndex,
}) => {
  if (!stop) {
    return
  }
  
  return (
    <div
      id={`stop-${index}`}
      className={cx("stopContainer", {
        hovered: currentStopIndex === index,
      })}
      onMouseEnter={() => setCurrentStopIndex?.(index)}
      onMouseLeave={() => setCurrentStopIndex?.(null)}
    >
      {currentStopIndex === index && (
        <Button
          className="absolute top-3 right-3 hover:bg-[#eeebda] rounded"
          onClick={() =>
            window.open(stop.gmapsUrl, "_blank", "noopener,noreferrer")
          }
        >
          <ArrowSquareOut className="w-5 h-5" />
        </Button>
      )}
      <h2>
        {index + 1}. {stop?.name}
      </h2>
      <div>
        <b>Address: </b>
        {stop.address}
      </div>
      <p>{stop.description}</p>
    </div>
  );
};

export default StopContainer;
