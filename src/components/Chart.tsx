import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { useAppContext, type Category } from '../Context/AppContext';

const COLORS: Record<Category, string> = {
  salary: '#1D9E75',
  food: '#378ADD',
  transport: '#EF9F27',
  shopping: '#D85A30',
  bills: '#7F77DD',
  other: '#888780',
};

function Chart() {
  const { transactions } = useAppContext();

  const expenses = transactions.filter((t) => t.type === 'expense');

  const categoryTotals = expenses.reduce(
    (acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    },
    {} as Record<Category, number>,
  );

  const data = Object.entries(categoryTotals).map(([name, value]) => ({
    name,
    value,
  }));

  if (data.length === 0) {
    return (
      <div className="flex h-full items-center justify-center rounded-xl border border-gray-700 p-4">
        <p className="text-sm text-gray-500">No expenses yet</p>
      </div>
    );
  }
  return (
    <div className="rounded-xl border border-gray-700 p-4">
      <h3 className="mb-4 text-xs tracking-widest text-gray-400 uppercase">
        Spending Breakdown
      </h3>

      <PieChart width={250} height={220}>
        <Pie
          data={data}
          cx={120}
          cy={100}
          innerRadius={60}
          outerRadius={90}
          paddingAngle={3}
          dataKey="value"
        >
          {data.map((entry) => (
            <Cell key={entry.name} fill={COLORS[entry.name as Category]} />
          ))}
        </Pie>
        <Tooltip
            formatter={(value) => `₦${Number(value).toLocaleString()}`}
          contentStyle={{
            backgroundColor: '#0f172a',
            border: '1px solid #374151',
            borderRadius: '8px',
            fontSize: '12px',
          }}
        />
        <Legend
          iconType="circle"
          iconSize={8}
           formatter={(value) => (
            <span style={{ fontSize: '12px', color: '#9ca3af' }}>{value}</span>
          )}
        />
      </PieChart>
    </div>
  );
}

export default Chart;
