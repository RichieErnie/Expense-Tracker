import TransactionItem from './TransactionItem';
import { useAppContext } from '../Context/AppContext';

function TransactionList() {
  const { transactions, clearTransaction } = useAppContext();

  const handleClear = () => {
    if(window.confirm('Are you sure you want to clear all transactions?')) {
      clearTransaction();
    }
  }

  return (
    <div className="rounded-xl border border-gray-700 p-4">
      <h3 className="mb-4 text-xs tracking-widest text-gray-400 uppercase">
        Recent Transactions
      </h3>

      {transactions.length > 3 && (
        <button
        onClick={handleClear}
        className="my-2 rounded-lg border border-red-400/30 px-3 py-1 text-xs text-red-400 transition-colors duration-200 hover:bg-red-400/10 hover:text-red-300">
          Clear All
        </button>
      )}

      {transactions.length === 0 ? (
        <p className="text-sm text-gray-500">
          No transactions yet. Add one above!
        </p>
      ) : (
        <div className="flex flex-col gap-2">
          {transactions.map((transaction) => (
             <TransactionItem key={transaction.id} transaction={transaction}/>
          ))}
         
        </div>
      )}
    </div>
  );
}

export default TransactionList;
