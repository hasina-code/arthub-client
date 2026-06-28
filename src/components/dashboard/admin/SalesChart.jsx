"use client";

import {
ResponsiveContainer,
AreaChart,
Area,
XAxis,
YAxis,
Tooltip,
} from "recharts";

export function SalesChart({ data }) {
return (
<div className="bg-[#09122E] rounded-3xl p-6 border border-slate-800">

  <h2 className="text-2xl font-bold mb-6 text-white">
    Sales Overview
  </h2>

  <div className="h-80">

    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>

        <defs>
          <linearGradient
            id="sales"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop
              offset="5%"
              stopColor="#ec4899"
              stopOpacity={0.4}
            />

            <stop
              offset="95%"
              stopColor="#ec4899"
              stopOpacity={0}
            />
          </linearGradient>
        </defs>

        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />

        <Area
          type="monotone"
          dataKey="amount"
          stroke="#ec4899"
          fill="url(#sales)"
        />

      </AreaChart>
    </ResponsiveContainer>

  </div>
</div>

);
}