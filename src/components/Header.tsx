import { useAppContext } from '../context/AppContext';
import type { TransactionType } from '../context/AppContext';

function Header() {
  const { transactions } = useAppContext();

  const incomeType: TransactionType = 'income';
  const expenseType: TransactionType = 'expense';

  const totalIncome = transactions
    .filter((t) => t.type === incomeType)
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === expenseType)
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <div>
      <div className="mb-4 flex items-center justify-between md:mb-6">
        <h1 className="text-2xl font-bold md:text-3xl">Expense Tracker</h1>
        <p className="text-xs text-gray-400 md:text-sm">
          {new Date().toLocaleDateString('en-US', {
            month: 'short',
            year: 'numeric',
          })}
        </p>
      </div>

      {/* Balance card */}
      <div className="mb-4 flex flex-col items-center rounded-2xl border border-gray-700 p-4 md:p-6">
        <p className="mb-2 text-xs tracking-widest text-gray-400 uppercase">
          Total Balance
        </p>
        <p
          className={`text-3xl font-bold md:text-4xl ${
            balance >= 0 ? 'text-white' : 'text-red-400'
          }`}
        >
          ₦{balance.toLocaleString()}
        </p>
      </div>

      {/* Income and expense stats */}
      <div className="mb-4 grid grid-cols-2 gap-3 md:gap-4">
        <div className="rounded-xl bg-[#2f3c47] p-3 md:p-4">
          <p className="mb-1 text-xs tracking-widest text-gray-400 uppercase">
            Income
          </p>
          <p className="text-xl font-bold text-green-400 md:text-2xl">
            ₦{totalIncome.toLocaleString()}
          </p>
        </div>
        <div className="rounded-xl bg-[#2f3c47] p-3 md:p-4">
          <p className="mb-1 text-xs tracking-widest text-gray-400 uppercase">
            Expenses
          </p>
          <p className="text-xl font-bold text-red-400 md:text-2xl">
            ₦{totalExpenses.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Header;
