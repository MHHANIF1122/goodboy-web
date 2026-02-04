"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Liquidity", value: 30 },
  { name: "Treasury", value: 30 },
  { name: "Private Sale", value: 25 },
  { name: "Building", value: 5 },
  { name: "Community", value: 5 },
  { name: "Developer", value: 5 },
];

const COLORS = {
  "Liquidity": "#2496c0",
  "Treasury": "#46798c",
  "Private Sale": "#44ef97de",
  "Building": "#16a34a",        
  "Community": "#f59e0b",      
  "Developer": "#ef4444",  
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
