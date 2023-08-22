import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export const Chart = ({ data }) => {
  const COLORS = ["#3366ff", "#ff0066", "#99ff33", "#FF8042", "#AF19FF"];

  const CustomTooltip = ({ active, payload }) => {
    if (active) {
      return (
        <div
          className="custom-tooltip"
          style={{
            backgroundColor: "#123",
            padding: "5px",
            border: "1px solid #cccc",
          }}
        >
          <label>{`${payload[0].name}: ${payload[0].value}`}</label>
        </div>
      );
    }
    return null;
  };

  return (
    <PieChart width={600} height={300}>
      <Pie
        data={data}
        color="#000000"
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={120}
        fill="#8884d8"
      >
        {data.map((_, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip content={<CustomTooltip />} />
      <Legend />
    </PieChart>
  );
};
