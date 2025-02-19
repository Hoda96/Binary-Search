import { useState } from "react";
import "./App.css";

interface SearchStepsProps {
  low: number;
  high: number;
  mid: number;
  midValue: number;
}

function App() {
  const [array, setArray] = useState<number[]>([]);
  const [target, setTarget] = useState<number | string>("");
  const [steps, setSteps] = useState<SearchStepsProps[]>([]);
  const [foundIndex, setFoundIndex] = useState(-1);

  const handleArrayInput = (e: { target: { value: string } }) => {
    const inputArray = e.target.value.split(",").map(Number);
    setArray(inputArray.sort((a, b) => a - b));
  };

  const handleTargetInput = (e: { target: { value: string } }) => {
    setTarget(Number(e.target.value));
  };

  const binarySearch = () => {
    let low = 0;
    let high = array.length - 1;
    const searchSteps = [];

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      searchSteps.push({ low, high, mid, midValue: array[mid] });

      if (array[mid] === target) {
        setFoundIndex(mid);
        setSteps(searchSteps);
        return;
      } else if (array[mid] < Number(target)) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }

    setFoundIndex(-1);
    setSteps(searchSteps);
  };

  return (
    <div className="App">
      <h1>Binary Search Visualizer</h1>
      <div>
        <label>
          Enter a sorted array of numbers (comma-separated):
          <input type="text" onChange={handleArrayInput} />
        </label>
      </div>
      <div>
        <label>
          Enter the target number:
          <input type="number" onChange={handleTargetInput} />
        </label>
      </div>
      <button onClick={binarySearch}>Search</button>

      {steps.length > 0 && (
        <div>
          <h2>Search Steps:</h2>
          <ul>
            {steps.map((step, index) => (
              <li key={index}>
                Low: {step.low}, High: {step.high}, Mid: {step.mid}, Mid Value:{" "}
                {step.midValue}
              </li>
            ))}
          </ul>
          {foundIndex !== -1 ? (
            <p>Target found at index: {foundIndex}</p>
          ) : (
            <p>Target not found in the array.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
