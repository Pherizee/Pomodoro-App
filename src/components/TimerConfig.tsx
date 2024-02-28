import React, { ChangeEvent } from "react";
import { TimeState } from "../App";

interface TimeConfigProps {
  times: TimeState;
  setTimes: (
    times: TimeState
  ) => void | React.Dispatch<React.SetStateAction<string>>;
}

const TimerConfig = ({ times, setTimes }: TimeConfigProps) => {
  const handleChange = (e: ChangeEvent) => {
    const inputEl = e.target as HTMLInputElement;
    const { name, value } = inputEl;
    const newTime = {
      ...times,
      [name]: value,
    };

    setTimes(newTime);
  };

  return (
    <>
      <div className="timer-config">
        <label htmlFor="focusTime">Configure Focus Time (mins)</label>
        <input
          type="number"
          id="focusTime"
          name="focus"
          min={1}
          max={45}
          value={times.focus}
          onChange={handleChange}
        />
      </div>
      <div className="timer-config">
        <label htmlFor="restTime">Configure Rest Time (mins)</label>
        <input
          type="number"
          id="restTime"
          name="rest"
          min={1}
          max={10}
          value={times.rest}
          onChange={handleChange}
        />
      </div>
    </>
  );
};

export default TimerConfig;
