import React from "react";

interface MarkerProps {
  index: number;
  isCurrentStop: boolean;
}

const Marker: React.FC<MarkerProps> = ({ index, isCurrentStop }) => {
  return (
    <div
      style={{
        backgroundColor: isCurrentStop ? "#3498db" : "#e74c3c",
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
    >
      {index + 1}
    </div>
  );
};

export default Marker;
