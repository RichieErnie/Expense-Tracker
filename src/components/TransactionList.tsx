import { useAppContext } from '../context/AppContext';
import TransactionItem from './TransactionItem';

function TransactionList() {
  const { transactions, clearTransactions } = useAppContext();

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear all transactions?')) {
      clearTransactions();
    }
  };

  return (
    <div className="mt-4 rounded-xl border border-gray-700 p-3 md:p-4">
      <div className="mb-3 flex items-center justify-between md:mb-4">
        <h3 className="text-xs tracking-widest text-gray-400 uppercase">
          Recent Transactions
        </h3>
        {transactions.length > 3 && (
          <button
            onClick={handleClear}
            className="rounded-lg border border-red-400/30 px-2 py-1 text-xs text-red-400 transition-colors duration-200 hover:bg-red-400/10 hover:text-red-300 md:px-3"
          >
            Clear all
          </button>
        )}
      </div>

      {transactions.length === 0 ? (
        <p className="py-6 text-center text-xs text-gray-500 md:py-8 md:text-sm">
          No transactions yet. Add one above!
        </p>
      ) : (
        <div className="flex flex-col gap-2">
          {transactions.map((transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))}
        </div>
      )}
    </div>
  );
}

export default TransactionList;
