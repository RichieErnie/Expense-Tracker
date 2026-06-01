import { useAppContext } from '../context/AppContext';
import type { Transaction } from '../context/AppContext';

interface TransactionItemProps {
  transaction: Transaction;
}

function TransactionItem({ transaction }: TransactionItemProps) {
  const { deleteTransaction } = useAppContext();

  return (
    <div className="flex items-center gap-2 md:gap-3 rounded-lg border border-gray-700 p-2.5 md:p-3">

      {/* Colored dot */}
      <div
        className={`h-2 w-2 shrink-0 rounded-full ${
          transaction.type === 'income' ? 'bg-green-400' : 'bg-red-400'
        }`}
      />

      {/* Description and category */}
      <div className="flex flex-1 flex-col min-w-0">
        <p className="text-xs md:text-sm truncate">{transaction.description}</p>
        <p className="text-[10px] md:text-xs text-gray-500">
          {transaction.category} • {transaction.date}
        </p>
      </div>

      {/* Amount */}
      <p
        className={`text-xs md:text-sm font-medium shrink-0 ${
          transaction.type === 'income' ? 'text-green-400' : 'text-red-400'
        }`}
      >
        {transaction.type === 'income' ? '+' : '-'}₦
        {transaction.amount.toLocaleString()}
      </p>

      {/* Delete button */}
      <span
        onClick={() => deleteTransaction(transaction.id)}
        className="cursor-pointer text-gray-500 hover:text-red-500 transition-colors duration-200 text-base md:text-lg shrink-0"
      >
        ×
      </span>
    </div>
  );
}

export default TransactionItem;