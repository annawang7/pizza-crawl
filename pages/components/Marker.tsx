import React from "react";

interface MarkerProps {
  index: number;
  isCurrentStop: boolean;
  setCurrentStopIndex: (index: number) => void;
}

const Marker: React.FC<MarkerProps> = ({
  index,
  isCurrentStop,
  setCurrentStopIndex,
}) => {
  return (
    <div
      style={{
        backgroundColor: isCurrentStop ? "#36488A" : "#DD633C",
        color: "white",
        width: "24px",
        height: "24px",
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontWeight: "bold",
        fontSize: "14px",
      }}
      onClick={() => setCurrentStopIndex(index)}
    >
      {index + 1}
    </div>
  );
};

export default Marker;
