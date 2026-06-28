import {
PieChart,
Pie,
Cell,
Tooltip,
ResponsiveContainer,
} from "recharts";

const COLORS = [
"#ec4899",
"#8b5cf6",
"#3b82f6",
"#10b981",
"#f59e0b",
];

export function CategoryPieChart({
data,
}) {
return (
<div className="bg-[#09122E] rounded-3xl p-6 border border-slate-800">

  <h2 className="text-2xl font-bold mb-6 text-white">
    Artworks By Category
  </h2>

  <div className="h-80">

    <ResponsiveContainer width="100%" height="100%">

      <PieChart>

        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          outerRadius={120}
          label
        >
          {data.map((entry, index) => (
            <Cell
              key={index}
              fill={
                COLORS[index % COLORS.length]
              }
            />
          ))}
        </Pie>

        <Tooltip />

      </PieChart>

    </ResponsiveContainer>

  </div>

</div>

);
}