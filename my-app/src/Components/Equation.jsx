import { useMemo, useState } from "react";
import { Line } from "react-chartjs-2";

export default function Equation() {
  const [A, setA] = useState(0);
  const [B, setB] = useState(0);
  const [C, setC] = useState(0);
  const [D, setD] = useState(0);
  const [E, setE] = useState(0);
  const [F, setF] = useState(0);

  const a = Number(A);
  const b = Number(B);
  const c = Number(C);
  const d = Number(D);
  const e = Number(E);
  const f = Number(F);

  const xValues = Array.from({ length: 50 }, (_, i) => i - 10);
  const line1 = xValues.map((x) => ({ x, y: (c - a * x) / b }));
  const line2 = xValues.map((x) => ({ x, y: (f - d * x) / e }));

  // Finding the graph's intersection using cramers rule.

  const intersection = useMemo(() => {
    const det = a * e - b * d;
    const EPS = 1e-12;

    if (Math.abs(det) < EPS) {
      const check1 = Math.abs(a * f - c * d) < EPS;
      const check2 = Math.abs(b * f - c * e) < EPS;
      if (check1 && check2) {
        return { status: "Infinite", x: null, y: null };
      } else {
        return { status: "Parallel", x: null, y: null };
      }
    }

    const x = (c * e - b * f) / det;
    const y = (a * f - c * d) / det;
    return { status: "Unique", x, y };
  }, [a, b, c, d, e, f]);

  const intersectionDataset =
    intersection.status === "Unique"
      ? [
          {
            label: "Intersection",
            data: [{ x: intersection.x, y: intersection.y }],
            showLine: false,
            pointRadius: 8,
            pointHoverRadius: 10,
          },
        ]
      : [];

  const data2 = {
    datasets: [
      {
        label: "Equation 1",
        data: line1,
      },
      {
        label: "Equation 2",
        data: line2,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        display: true,
        type: "linear",
        position: "bottom",
      },
      y: { display: true },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            if (context.dataset.label === "Intersection") {
              const px = context.parsed.x;
              const py = context.parsed.y;
              return `Intersection (x: ${px.toFixed(3)}, y:${py.toFixed(3)})`;
            }
            return `x: ${context.parsed.x}, y: ${context.parsed.y}`;
          },
        },
      },
    },
  };

  const renderIntersectionText = () => {
    if (intersection.status === "Unique") {
      return (
        <div>
          <p>
            Value of X = <strong>{intersection.x.toFixed(6)}</strong>
          </p>
          <p>
            Value of Y = <strong>{intersection.y.toFixed(6)}</strong>
          </p>
        </div>
      );
    }
    if (intersection.status === "Parallel") {
      return (
        <div>
          <p>
            No unique Intersection, The lines are <strong>parallel</strong>{" "}
          </p>
        </div>
      );
    }
    if (intersection.status === "Infinite") {
      return (
        <div>
          <p>
            No unique Intersection, The lines are <strong>Coincident</strong>,
            infinitely many intersect{" "}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <h1 className="text-3xl">Simultaneous Equations solved Graphically</h1>
      <div>
        <p>
          <input
            type="number"
            className="outline-1 w-[5%] text-center"
            value={A}
            onChange={(e) => {
              setA(e.target.value);
            }}
          />
          <label>X</label>
          <label> + </label>
          <input
            type="number"
            className="outline-1 w-[5%] text-center"
            value={B}
            onChange={(e) => {
              setB(e.target.value);
            }}
          />
          <label>Y</label>
          <label> = </label>
          <input
            type="number"
            className="outline-1 w-[5%] text-center"
            value={C}
            onChange={(e) => {
              setC(e.target.value);
            }}
          />
        </p>
        <p>Equation 1</p>
      </div>
      <div>
        <p>
          <input
            type="number"
            className="outline-1 w-[5%] text-center"
            value={D}
            onChange={(e) => {
              setD(e.target.value);
            }}
          />
          <label>X</label>
          <label> + </label>
          <input
            type="number"
            className="outline-1 w-[5%] text-center"
            value={E}
            onChange={(e) => {
              setE(e.target.value);
            }}
          />
          <label>Y</label>
          <label> = </label>
          <input
            type="number"
            className="outline-1 w-[5%] text-center"
            value={F}
            onChange={(e) => {
              setF(e.target.value);
            }}
          />
        </p>
        <p>Equation 2</p>
      </div>
      <div>
        <Line data={data2} options={options} />
      </div>
      <div>{renderIntersectionText()}</div>
    </>
  );
}
