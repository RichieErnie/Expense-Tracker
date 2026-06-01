import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { useAppContext } from '../context/AppContext';
import type { Category } from '../context/AppContext';

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
      <div className="rounded-xl border border-gray-700 p-3 md:p-4 flex items-center justify-center min-h-50">
        <p className="text-xs md:text-sm text-gray-500">No expenses yet</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-700 p-3 md:p-4">
      <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-3 md:mb-4">
        Spending Breakdown
      </h3>
      <div className="flex justify-center">
        <PieChart width={220} height={200}>
          <Pie
            data={data}
            cx={110}
            cy={90}
            innerRadius={50}
            outerRadius={80}
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((entry) => (
              <Cell
                key={entry.name}
                fill={COLORS[entry.name as Category]}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => `₦${Number(value).toLocaleString()}`}
            contentStyle={{
              backgroundColor: '#0f172a',
              border: '1px solid #374151',
              borderRadius: '8px',
              fontSize: '11px',
            }}
          />
          <Legend
            iconType="circle"
            iconSize={7}
            formatter={(value) => (
              <span style={{ fontSize: '11px', color: '#9ca3af' }}>
                {value}
              </span>
            )}
          />
        </PieChart>
      </div>
    </div>
  );
}

export default Chart;