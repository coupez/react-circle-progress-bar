import React from "react";
import { createRoot } from "react-dom/client";
import Progress from "./lib/progress";
import "./styles.css";

function App() {
  const [p1, setP1] = React.useState(0);
  const [p2, setP2] = React.useState(0);
  const [p3, setP3] = React.useState(0);
  const [play, setPlay] = React.useState(true);
  const playRef = React.useRef();
  playRef.current = play;

  React.useEffect(() => {
    setP1((p) => Math.random() * 100);
    setInterval(
      () => playRef.current && setP1((p) => Math.round(Math.random() * 100)),
      200
    );
    setInterval(
      () => playRef.current && setP2((p) => Math.random() * 100),
      1000
    );
    setInterval(
      () => playRef.current && setP3((p) => Math.random() * 100),
      1000
    );
  }, []);

  return (
    <div className="demo">
      <button style={{ display: "block" }} onClick={() => setPlay((p) => !p)}>
        {play ? "pause" : "play"}
      </button>
      <Progress
        progress={p1}
        transitionDuration={1}
        gradient={[
          { stop: 0.0, color: "#f6416d" },
          { stop: 1, color: "#fa6d7c" },
        ]}
      />
      <Progress progress={p2} subtitle={"storage"} />
      <Progress progress={100} />
      <Progress progress={p3} reduction={0} hideBall />
      <Progress
        progress={p1}
        hideBall
        gradient={[
          { stop: 0.0, color: "#f6416d" },
          { stop: 1, color: "#fa6d7c" },
        ]}
      />
      <Progress progress={p1} />
      <Progress progress={37.05} subtitle="Battery" />
      <Progress
        progress={73}
        hideBall
        gradient={[
          { stop: 0.0, color: "#f6416d" },
          { stop: 1, color: "#fa6d7c" },
        ]}
      />
      <Progress progress={82.05} subtitle="Usage" reduction={0} />
      <Progress progress={37.05} subtitle="Battery" />
      <Progress
        progress={82.05}
        subtitle="Usage"
        reduction={0}
        hideBall
        strokeWidth={10}
      />
      <Progress
        progress={73}
        strokeWidth={6}
        gradient={[
          { stop: 0.0, color: "#f6416d" },
          { stop: 1, color: "#fa6d7c" },
        ]}
      />
      <Progress progress={p1} min={0} max={10} subtitle="custom range" />
      <Progress
        progress={p1}
        counterClockwise={true}
        subtitle="counter-clockwise"
      />
    </div>
  );
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
