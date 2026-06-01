import { useState } from 'react';
import type { Category, TransactionType } from '../Context/AppContext';
import { useAppContext } from '../Context/AppContext';

function AddTransaction() {
  const { addTransaction } = useAppContext();

  const [type, setType] = useState<TransactionType>('income');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<Category>('salary');
  const [date, setDate] = useState('');

  const handleAdd = () => {
    const ParsedAmount = parseFloat(amount);
    if (description.trim() === '' || ParsedAmount <= 0 || date === '') return;
    addTransaction({
      description: description.trim(),
      amount: ParsedAmount,
      type,
      category,
      date,
    });
    setDescription('');
    setAmount('');
    setDate('');
  };

  return (
    <div className="rounded-xl border border-gray-700 p-4">
      <h3 className="mb-4 text-xs tracking-widest text-gray-400 uppercase">
        Add Transaction
      </h3>

      {/* Income / Expense toggle */}
      <div className="mb-4 grid grid-cols-2 gap-2">
        <button
          onClick={() => {
            setType('income');
            setCategory('salary')
          }}
          className={`rounded-lg border py-2 text-sm font-medium transition-colors duration-200 ${
            type === 'income'
              ? 'border-green-500 text-green-400'
              : 'border-gray-700'
          }`}
        >
          + Income
        </button>
        <button
          onClick={() => {
            setType('expense');
            setCategory('food')
          }}
          className={`rounded-lg border py-2 text-sm font-medium transition-colors duration-200 ${
            type == 'expense'
              ? 'border-red-500 bg-red-500/10 text-red-400'
              : 'border-gray-700 text-gray-400'
          }`}
        >
          - Expense
        </button>
      </div>

      {/* Description input */}
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        type="text"
        placeholder="Description..."
        className="mb-3 w-full rounded-lg border border-gray-700 bg-transparent p-2 text-sm placeholder-gray-500 outline-none focus:border-white"
      />

      {/* Amount input */}
      <input
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        min="0"
        type="number"
        placeholder="Amount (₦)..."
        className="mb-3 w-full rounded-lg border border-gray-700 bg-transparent p-2 text-sm placeholder-gray-500 outline-none focus:border-white"
      />

      {/* Category and date row */}
      <div className="mb-4 grid grid-cols-2 gap-2">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as Category)}
          className="cursor-pointer rounded-lg border border-gray-700 bg-[#0f172a] p-2 text-sm text-gray-400 outline-none focus:border-white"
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
          value={date}
          onChange={(e) => setDate(e.target.value)}
          type="date"
          className="cursor-pointer rounded-lg border border-gray-700 bg-transparent p-2 text-sm text-gray-400 outline-none focus:border-white"
        />
      </div>

      {/* Add button */}
      <button
        onClick={handleAdd}
        className="w-full rounded-lg bg-white py-2 text-sm font-medium text-black transition-colors duration-200 hover:bg-gray-200"
      >
        Add Transaction
      </button>
    </div>
  );
}

export default AddTransaction;
