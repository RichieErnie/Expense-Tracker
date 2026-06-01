import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import type { TransactionType, Category } from '../context/AppContext';

function AddTransaction() {
  const { addTransaction } = useAppContext();

  const [type, setType] = useState<TransactionType>('income');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<Category>('salary');
  const [date, setDate] = useState('');

  const handleAdd = () => {
    const parsedAmount = parseFloat(amount);
    if (description.trim() === '' || parsedAmount <= 0 || date === '') return;
    addTransaction({
      description: description.trim(),
      amount: parsedAmount,
      type,
      category,
      date,
    });
    setDescription('');
    setAmount('');
    setDate('');
  };

  return (
    <div className="rounded-xl border border-gray-700 p-3 md:p-4">
      <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-3 md:mb-4">
        Add Transaction
      </h3>

      {/* Income / Expense toggle */}
      <div className="grid grid-cols-2 gap-2 mb-3 md:mb-4">
        <button
          onClick={() => {
            setType('income');
            setCategory('salary');
          }}
          className={`rounded-lg border py-1.5 md:py-2 text-xs md:text-sm font-medium transition-colors duration-200 ${
            type === 'income'
              ? 'border-green-500 bg-green-500/10 text-green-400'
              : 'border-gray-700 bg-transparent text-white'
          }`}
        >
          + Income
        </button>
        <button
          onClick={() => {
            setType('expense');
            setCategory('food');
          }}
          className={`rounded-lg border py-1.5 md:py-2 text-xs md:text-sm font-medium transition-colors duration-200 ${
            type === 'expense'
              ? 'border-red-500 bg-red-500/10 text-red-400'
              : 'border-gray-700 bg-transparent text-white'
          }`}
        >
          - Expense
        </button>
      </div>

      {/* Description input */}
      <input
        type="text"
        placeholder="Description..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full rounded-lg border border-gray-700 bg-transparent p-2 text-xs md:text-sm placeholder-gray-500 outline-none focus:border-white mb-2 md:mb-3"
      />

      {/* Amount input */}
      <input
        type="number"
        placeholder="Amount (₦)..."
        value={amount}
        min="0"
        onChange={(e) => setAmount(e.target.value)}
        className="w-full rounded-lg border border-gray-700 bg-transparent p-2 text-xs md:text-sm placeholder-gray-500 outline-none focus:border-white mb-2 md:mb-3"
      />

      {/* Category and date row */}
      <div className="grid grid-cols-2 gap-2 mb-3 md:mb-4">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as Category)}
          className="rounded-lg border border-gray-700 bg-[#0f172a] p-2 text-xs md:text-sm text-gray-400 outline-none focus:border-white cursor-pointer"
        >
          {type === 'income' ? (
            <>
              <option value="salary">Salary</option>
              <option value="other">Other</option>
            </>
          ) : (
            <>
              <option value="food">Food</option>
              <option value="transport">Transport</option>
              <option value="shopping">Shopping</option>
              <option value="bills">Bills</option>
              <option value="other">Other</option>
            </>
          )}
        </select>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="rounded-lg border border-gray-700 bg-transparent p-2 text-xs md:text-sm text-gray-400 outline-none focus:border-white cursor-pointer"
        />
      </div>

      {/* Add button */}
      <button
        onClick={handleAdd}
        className="w-full rounded-lg bg-white py-2 text-xs md:text-sm font-medium text-black hover:bg-gray-200 transition-colors duration-200"
      >
        Add Transaction
      </button>
    </div>
  );
}

export default AddTransaction;