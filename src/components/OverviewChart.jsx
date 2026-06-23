"use client";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function OverviewChart({ data }) {
  return (
    <div className="h-64 w-full bg-[#0f131f] p-4 rounded-2xl border border-gray-800">
      <h3 className="text-gray-400 mb-4 text-sm">Activity Overview</h3>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            {/* <linearGradient id="colorValue" x1="0" y1="0" x2="0" y1="1">
              <stop offset="5%" stopColor="#db2777" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#db2777" stopOpacity={0}/>
            </linearGradient> */}
          </defs>
          <XAxis dataKey="name" stroke="#666" fontSize={12} />
          <YAxis stroke="#666" fontSize={12} />
          <Tooltip contentStyle={{ backgroundColor: '#0f131f', border: '1px solid #333' }} />
          <Area type="monotone" dataKey="value" stroke="#db2777" fill="url(#colorValue)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}