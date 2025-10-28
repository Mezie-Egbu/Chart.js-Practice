import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  scales,
} from "chart.js/auto";
import { Bar, Doughnut, Line, Pie } from "react-chartjs-2";
import { useState } from "react";

export default function Chart() {
  const [chartType, setChartType] = useState("Bar");
  const [A, setA] = useState(1);
  const [B, setB] = useState(2);
  const [C, setC] = useState(3);
  const [D, setD] = useState(4);
  const [E, setE] = useState(5);

  const data = {
    labels: ["A", "B", "C", "D", "E"],
    datasets: [
      {
        label: "Check",
        data: [A, B, C, D, E],
      },
    ],
  };

  const renderChart = () => {
    switch (chartType) {
      case "Bar":
        return <Bar data={data} options={options} />;
      case "Line":
        return <Line data={data} options={options} />;
      case "Doughnut":
        return <Doughnut data={data} options={options} />;
      case "Pie":
        return <Pie data={data} options={options} />;
    }
  };

  const options = {
    scales: {
      x: { display: true },
      y: { display: true },
    },
  };

  return (
    <>
      <div>
        <select
          value={chartType}
          onChange={(e) => {
            setChartType(e.target.value);
          }}
        >
          <option value="Bar">Bar Chart</option>
          <option value="Line">Line Chart</option>
          <option value="Doughnut">Doughnut Chart</option>
          <option value="Pie"> Pie Chart</option>
        </select>
      </div>
      <div>
        <div>
          <label>Value A</label>
          <input
            type="number"
            className="outline-1 w-[10%] ml-2"
            value={A}
            onChange={(e) => {
              setA(e.target.value);
            }}
          />
        </div>
        <div>
          <label>Value B</label>
          <input
            type="number"
            className="outline-1 w-[10%] ml-2"
            value={B}
            onChange={(e) => {
              setB(e.target.value);
            }}
          />
        </div>
        <div>
          <label>Value C</label>
          <input
            type="number"
            className="outline-1 w-[10%] ml-2"
            value={C}
            onChange={(e) => {
              setC(e.target.value);
            }}
          />
        </div>
        <div>
          <label>Value D</label>
          <input
            type="number"
            className="outline-1 w-[10%] ml-2"
            value={D}
            onChange={(e) => {
              setD(e.target.value);
            }}
          />
        </div>
        <div>
          <label>Value E</label>
          <input
            type="number"
            className="outline-1 w-[10%] ml-2"
            value={E}
            onChange={(e) => {
              setE(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="w-1/2">{renderChart()}</div>
    </>
  );
}
