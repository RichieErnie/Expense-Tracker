import { useAppContext } from '../Context/AppContext';
import type { TransactionType } from '../Context/AppContext';

function Header() {
  const { transactions } = useAppContext();

  const incomeType: TransactionType = 'income';
  const expenseType: TransactionType = 'expense';

  const totalIncome = transactions
    .filter((t) => t.type === incomeType)
    .reduce((acct, t) => acct + t.amount, 0);
  const totalExpense = transactions
    .filter((t) => t.type === expenseType)
    .reduce((acct, t) => acct + t.amount, 0);
    
    const balance = totalIncome - totalExpense;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Expense Tracker</h1>
        <p className="text-sm text-gray-400">May 2026</p>
      </div>

      {/* Balance card */}
      <div className="mb-4 flex flex-col items-center rounded-2xl border border-gray-700 p-6">
        <p className="mb-2 text-xs tracking-widest text-gray-400 uppercase">
          Total Balance
        </p>
        <p className="text-4xl font-bold">₦{balance.toLocaleString()}</p>
      </div>

      {/* Income and expense stats */}
      <div className="mb-4 grid grid-cols-2 gap-4">
        <div className="rounded-xl bg-[#2f3c47] p-4">
          <p className="mb-1 text-xs tracking-widest text-gray-400 uppercase">
            Income
          </p>
          <p className="text-2xl font-bold text-green-400">₦{totalIncome.toLocaleString()}</p>
        </div>
        <div className="rounded-xl bg-[#2f3c47] p-4">
          <p className="mb-1 text-xs tracking-widest text-gray-400 uppercase">
            Expenses
          </p>
          <p className="text-2xl font-bold text-red-400">₦{totalExpense.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}

export default Header;
