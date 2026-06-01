import { createContext, useContext, useState, useEffect } from 'react';

export type TransactionType = 'income' | 'expense';

export type Category =
  | 'salary'
  | 'food'
  | 'transport'
  | 'shopping'
  | 'bills'
  | 'other';

export interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: TransactionType;
  category: Category;
  date: string;
}

interface AppContextType {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: number) => void;
  clearTransaction: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const stored = localStorage.getItem('transactions');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      id: Date.now(),
      ...transaction,
    };
    setTransactions([...transactions, newTransaction]);
  };

  const deleteTransaction = (id: number) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };
  const clearTransaction = () => {
    setTransactions([]);
  }

  return (
    <AppContext.Provider
      value={{ transactions, addTransaction, deleteTransaction, clearTransaction }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}