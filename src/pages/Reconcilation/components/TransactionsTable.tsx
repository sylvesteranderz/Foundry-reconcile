import React from 'react';
import { cn } from '@/lib/utils';

interface Transaction {
  id: string;
  date: string;
  amount: string;
  type: string;
  status: string;
  reconciliationDate: string;
}

interface Props { className?: string }

export const TransactionsTable: React.FC<Props> = ({ className }) => {
  const transactions: Transaction[] = [
    {
      id: 'TXN12345',
      date: '2024-01-15',
      amount: '$500.00',
      type: 'Payment',
      status: 'Reconciled',
      reconciliationDate: '2024-01-16'
    },
    {
      id: 'TXN67890',
      date: '2024-01-20',
      amount: '$1,200.00',
      type: 'Refund',
      status: 'Reconciled',
      reconciliationDate: '2024-01-21'
    },
    {
      id: 'TXN11223',
      date: '2024-02-05',
      amount: '$750.00',
      type: 'Payment',
      status: 'Reconciled',
      reconciliationDate: '2024-02-06'
    },
    {
      id: 'TXN44556',
      date: '2024-02-10',
      amount: '$300.00',
      type: 'Adjustment',
      status: 'Reconciled',
      reconciliationDate: '2024-02-11'
    },
    {
      id: 'TXN77889',
      date: '2024-02-15',
      amount: '$900.00',
      type: 'Payment',
      status: 'Reconciled',
      reconciliationDate: '2024-02-16'
    }
  ];

  return (
    <div className={cn("bg-gray-800 rounded-lg border border-gray-700 overflow-hidden", className)}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">
                Transaction ID
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">
                Reconciliation Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {transactions.map((transaction, index) => (
              <tr key={index} className="hover:bg-gray-750 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-mono">
                  {transaction.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {transaction.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-medium">
                  {transaction.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-400 font-medium">
                  {transaction.type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-400 font-medium">
                  {transaction.status}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {transaction.reconciliationDate}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
