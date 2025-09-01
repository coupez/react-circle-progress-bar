import React from "react";
import { useSpring, animated } from "react-spring";
import styles from "./progress.module.css";

function _Progress({
  progress = 0,
  min = 0,
  max = 100,
  strokeWidth = 4,
  ballStrokeWidth = 16,
  reduction = 0.25,
  counterClockwise = false,
  transitionDuration = 0.5,
  transitionTimingFunction = "ease",
  background = "#dde2e9",
  hideBall = false,
  hideValue = false,
  gradient = [
    { stop: 0.0, color: "#00bc9b" },
    { stop: 1, color: "#5eaefd" },
  ],
  subtitle = "",
  style,
  className,
  suffix = "%",
}) {
  const progressPercentage = ((progress - min) / (max - min)) * 100;
  const width = 200;
  const center = width / 2;
  const height = 200 || center + center * Math.cos(reduction * Math.PI);
  const [unique] = React.useState(() => Math.random().toString());
  const rotate = 90 + 180 * reduction;
  const r = center - strokeWidth / 2 - ballStrokeWidth / 2;
  const circumference = Math.PI * r * 2;

  const { val } = useSpring({
    val: progressPercentage,
    config: { duration: transitionDuration * 1000 },
  });

  return (
    <div className={`${className} ${styles.progress}`} style={style}>
      <svg viewBox={`0 0 ${width} ${height}`} className={styles.svg}>
        <defs>
          <linearGradient
            id={"gradient" + unique}
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            {gradient.map(({ stop, color }) => (
              <stop key={stop} offset={stop * 100 + "%"} stopColor={color} />
            ))}
          </linearGradient>
        </defs>
        {!hideValue && (
          <animated.text
            x={center}
            y={center}
            textAnchor="middle"
            fontSize="30"
            fill="#3c3c3c"
          >
            {val.to((v) => `${Math.round(v)}${suffix}`)}
          </animated.text>
        )}
        <text
          x={center}
          y={center + (30 * 3) / 4}
          textAnchor="middle"
          fill="#9c9c9c"
        >
          {subtitle}
        </text>
        <circle
          transform={`rotate(${rotate} ${center} ${center})`}
          id="path"
          cx={center}
          cy={center}
          r={r}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference * reduction}
          fill="none"
          stroke={background}
          strokeLinecap="round"
        ></circle>
        <animated.circle
          transform={
            counterClockwise
              ? `scale(1, -1) translate(0, -${height})`
              : `rotate(${rotate} ${center} ${center})`
          }
          id="path"
          cx={center}
          cy={center}
          r={r}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference}`}
          strokeDashoffset={val.to(
            (v) => (circumference * (100 - v * (1 - reduction))) / 100
          )}
          fill="none"
          stroke={`url(#gradient${unique})`}
          strokeLinecap="round"
        ></animated.circle>
        {!hideBall && (
          <animated.circle
            transform={
              counterClockwise
                ? `scale(1, -1) translate(0, -${height})`
                : `rotate(${rotate} ${center} ${center})`
            }
            id="path"
            cx={center}
            cy={center}
            r={r}
            strokeWidth={ballStrokeWidth}
            strokeDasharray={`1 ${circumference}`}
            strokeDashoffset={val.to(
              (v) => (circumference * (100 - v * (1 - reduction))) / 100
            )}
            fill="none"
            stroke={`url(#gradient${unique})`}
            strokeLinecap="round"
          ></animated.circle>
        )}
      </svg>
    </div>
  );
}

export const Progress = React.memo(_Progress);
Progress.displayName = "Progress";

export default Progress;
