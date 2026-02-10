"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Treasury", value: 30 },
  { name: "Liquidity", value: 15 },
  { name: "Pre-Sale", value: 15 },
  { name: "Investor", value: 15 },
  { name: "Team", value: 10 },
  { name: "Community", value: 5 },
  { name: "Building", value: 5 },
  { name: "Marketing", value: 5 },
];

const COLORS = {
  "Treasury": "#2496c0",
  "Liquidity": "#46798c",
  "Pre-Sale": "#44ef97de",
  "Investor": "#16a34a",
  "Team": "#c3800c",
  "Community": "#f59e0b",
  "Building": "#ef4444",
  "Marketing": "#f07676",  
};

export default function TokenomicChart() {
  return (
    <div
      style={{
        width: "100%",
        height: 320,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <ResponsiveContainer width={360} height={320}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={110}
            label={({ value }) => `${value}%`}
          >
            {data.map((entry) => (
              <Cell
                key={entry.name}
                fill={COLORS[entry.name as keyof typeof COLORS]}
              />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value}%`} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
