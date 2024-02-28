import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import { TodoType } from "./Todo";

interface TimerProps {
  minutes: number;
  seconds: number;
  maxValue: number;
  focusMode: boolean;
  restMode: boolean;
  selectedTask: TodoType | null;
}

const Timers = ({
  minutes,
  seconds,
  maxValue,
  focusMode,
  selectedTask,
  restMode,
}: TimerProps) => {
  const totalValue = minutes * 60 + seconds;

  return (
    <div>
      {focusMode && <h3>Focus Mode: {selectedTask?.task}</h3>}
      {restMode && <h3>Rest Mode</h3>}

      <div className="timer">
        <CircularProgressbarWithChildren
          value={totalValue}
          maxValue={maxValue}
          strokeWidth={5}
          styles={buildStyles({
            pathColor: "#375494",
            trailColor: "#303B51",
          })}
        ></CircularProgressbarWithChildren>
        <div className="time">
          {minutes.toString().padStart(2, "0")} :{" "}
          {seconds.toString().padStart(2, "0")}
        </div>
      </div>
    </div>
  );
};

export default Timers;
