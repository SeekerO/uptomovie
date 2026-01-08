import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
const CircularProgress = ({ percentage }) => {
  return (
    <div
      style={{ width: 50, height: 50 }}
      className="rounded-full z-40"
    >
      <CircularProgressbar
        value={percentage}
        maxValue={10}
        text={`${percentage}0%`}
        background={true}
        styles={{
          // Customize the path, i.e. the "completed progress"
          path: {
            // Path color
            stroke: `#EE2B47`,
            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
            strokeLinecap: "butt",
            // Customize transition animation
            transition: "stroke-dashoffset 0.5s ease 0s",
            // Rotate the path
            transform: "rotate(0.25turn)",
            transformOrigin: "center center",
          },
          // Customize the circle behind the path, i.e. the "total progress"
          trail: {
            // Trail color
            stroke: "#d6d6d6",
            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
            strokeLinecap: "butt",
            // Rotate the trail
            transform: "rotate(0.25turn)",
            transformOrigin: "center center",
          },
          // Customize the text
          text: {
            // Text color
            fill: "#EE2B47",
            // Text size
            fontSize: "20px",
          },
          // Customize background - only used when the `background` prop is true
          background: {
            fill: "#F0EEE2",
          },
        }}
      />
    </div>
  );
};

export default CircularProgress;
