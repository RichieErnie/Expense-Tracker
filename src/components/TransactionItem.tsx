import { useAppContext, type Transaction } from '../Context/AppContext';

interface TransactionItemProps {
  transaction: Transaction;
}

function TransactionItem({ transaction }: TransactionItemProps) {
  const {deleteTransaction} = useAppContext();
  return (
    <div className="flex items-center gap-3 rounded-lg border border-gray-700 p-3">
      {/* Colored dot — green for income, red for expense */}
      <div className="h-2 w-2 shrink-0 rounded-full bg-green-400" />

      {/* Description and category */}
      <div className="flex flex-1 flex-col">
        <p className="text-sm">{transaction.description}</p>
        <p className="text-xs text-gray-500">
          {transaction.category} • {transaction.date}
        </p>
      </div>

      {/* Amount */}
      <p
        className={`text-sm font-medium ${transaction.type === 'income' ? 'text-green-400' : 'text-red-400'}`}
      >
        {transaction.type === 'income' ? '+' : '-'}₦
        {transaction.amount.toLocaleString()}
      </p>

      {/* Delete button */}
      <span 
      onClick={() => {deleteTransaction(transaction.id)}}
      className="cursor-pointer text-gray-500 transition-colors duration-200 hover:text-red-500">
        ×
      </span>
    </div>
  );
}

export default TransactionItem;
