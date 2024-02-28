import { useState } from "react";
import "./App.css";
import TodoList from "./components/TodoList";
import { TodoType } from "./components/Todo";
import { useTimer } from "react-timer-hook";
import TimerConfig from "./components/TimerConfig";
import Timers from "./components/Timers";

export interface TimeState {
  focus: number;
  rest: number;
}

function App() {
  const [isFocusStarted, setIsFocusStarted] = useState(false);
  const [isRestStarted, setIsRestStarted] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<TodoType | null>(null);
  const [times, setTimes] = useState<TimeState>({
    focus: 25,
    rest: 5,
  });

  const generateTimerOffset = (time: number) => {
    // collects time in minutes
    time *= 60;
    const now: Date = new Date();
    now.setSeconds(now.getSeconds() + time);

    return now;
  };

  const startPomodoro = () => {
    stop();
    if (!isFocusStarted) {
      setIsFocusStarted(true);
      setIsRestStarted(false);
      const newTimeStamp = generateTimerOffset(times.focus);
      restart(newTimeStamp);
    } else if (!isRestStarted) {
      setIsFocusStarted(false);
      setIsRestStarted(true);
      const newTimeStamp = generateTimerOffset(times.rest);
      restart(newTimeStamp);
    }
  };

  const { seconds, minutes, restart, pause, isRunning } = useTimer({
    expiryTimestamp: new Date(),
    autoStart: false,
    onExpire: () => {
      setTimeout(() => startPomodoro(), 500);
    },
  });

  return (
    <div>
      <h1>Feranmi's Pomodoro App</h1>

      <div className="pomodoro-wrapper">
        <TodoList
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
        />
        <div>
          <TimerConfig times={times} setTimes={setTimes} />
          <Timers
            minutes={minutes}
            seconds={seconds}
            focusMode={isFocusStarted}
            restMode={isRestStarted}
            maxValue={times.focus * 60}
            selectedTask={selectedTodo}
          />
          {!!selectedTodo && (
            <>
              {!isRunning && (!isFocusStarted || !isRestStarted) ? (
                <button onClick={startPomodoro}>Start Focus Time</button>
              ) : (
                <button onClick={pause}>Stop</button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
