import React, { useState } from 'react';

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  selected: boolean;
}

export const TransactionLists: React.FC = () => {
  const [bankTransactions, setBankTransactions] = useState<Transaction[]>([
    {
      id: '1',
      date: '2024-07-30',
      description: 'Payment from Client A',
      amount: 500.00,
      selected: false,
    },
    {
      id: '2',
      date: '2024-07-27',
      description: 'Deposit - Check #1234',
      amount: 1200.00,
      selected: true,
    },
    {
      id: '3',
      date: '2024-07-28',
      description: 'Withdrawal - ATM',
      amount: -100.00,
      selected: false,
    },
  ]);

  const [foundryTransactions, setFoundryTransactions] = useState<Transaction[]>([
    {
      id: '4',
      date: '2024-07-30',
      description: 'Invoice Payment - Client A',
      amount: 500.00,
      selected: false,
    },
    {
      id: '5',
      date: '2024-07-27',
      description: 'Check Deposit',
      amount: 1200.00,
      selected: true,
    },
    {
      id: '6',
      date: '2024-07-28',
      description: 'ATM Withdrawal',
      amount: -100.00,
      selected: true,
    },
  ]);

  const toggleBankTransaction = (id: string) => {
    setBankTransactions(prev =>
      prev.map(t => (t.id === id ? { ...t, selected: !t.selected } : t))
    );
  };

  const toggleFoundryTransaction = (id: string) => {
    setFoundryTransactions(prev =>
      prev.map(t => (t.id === id ? { ...t, selected: !t.selected } : t))
    );
  };

  const formatAmount = (amount: number) => {
    const formatted = Math.abs(amount).toFixed(2);
    return amount < 0 ? `-$${formatted}` : `$${formatted}`;
  };

  return (
    <div className="space-y-6">
      {/* Bank Transactions */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-base font-semibold text-gray-900">Bank Transactions</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                  {/* Checkbox column */}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bankTransactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className={`${
                    transaction.selected ? 'bg-emerald-50' : 'hover:bg-gray-50'
                  } transition-colors cursor-pointer`}
                  onClick={() => toggleBankTransaction(transaction.id)}
                >
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={transaction.selected}
                      onChange={() => {}}
                      className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.date}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {transaction.description}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm text-right font-medium ${
                    transaction.amount < 0 ? 'text-red-600' : 'text-gray-900'
                  }`}>
                    {formatAmount(transaction.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Foundry Finance Transactions */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-base font-semibold text-gray-900">Foundry Finance Transactions</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                  {/* Checkbox column */}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {foundryTransactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className={`${
                    transaction.selected ? 'bg-emerald-50' : 'hover:bg-gray-50'
                  } transition-colors cursor-pointer`}
                  onClick={() => toggleFoundryTransaction(transaction.id)}
                >
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={transaction.selected}
                      onChange={() => {}}
                      className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.date}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {transaction.description}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm text-right font-medium ${
                    transaction.amount < 0 ? 'text-emerald-600' : 'text-gray-900'
                  }`}>
                    {formatAmount(transaction.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

