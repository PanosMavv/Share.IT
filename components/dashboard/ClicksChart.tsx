// components/dashboard/ClicksChart.tsx
"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function ClicksChart({ data }: { data: { date: string; clicks: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="clicks" stroke="#6366f1" />
      </LineChart>
    </ResponsiveContainer>
  );
}