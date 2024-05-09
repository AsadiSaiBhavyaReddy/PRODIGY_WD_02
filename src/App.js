import React, { useState, useRef } from "react";
import "./App.css";

function App() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const [isLapActive, setIsLapActive] = useState(false);
  const intervalRef = useRef(null);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}.${milliseconds.toString().padStart(2, "0")}`;
  };

  const startTimer = () => {
    if (!isRunning) {
      const startTime = Date.now() - time;
      intervalRef.current = setInterval(() => {
        setTime(Date.now() - startTime);
      }, 10);
      setIsRunning(true);
    }
  };

  const pauseTimer = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setTime(0);
    setIsRunning(false);
    setLaps([]);
  };

  const lapTimer = () => {
    if (isLapActive) {
      setLaps([...laps, time]);
    }
  };

  const toggleLapActive = () => {
    setIsLapActive(!isLapActive);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Stopwatch</h1>
      </header>
      <main>
        <div className="card">
          <div className="stopwatch">
            <div className="clock">
              {formatTime(time)}
            </div>
            <div className="buttons">
              <button onClick={startTimer}>Start</button>
              <button onClick={pauseTimer}>Pause</button>
              <button onClick={resetTimer}>Reset</button>
              <button onClick={lapTimer} className={isLapActive ? "active" : ""}>Lap</button>
              <button onClick={toggleLapActive}>{isLapActive ? "Disable Lap" : "Enable Lap"}</button>
            </div>
            <ul className="laps">
              {laps.map((lap, index) => (
                <li key={index}>Lap {index + 1}: {formatTime(lap)}</li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
