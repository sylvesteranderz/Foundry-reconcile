import React, { useState } from 'react';
import CustomTableComponent from '@/components/tables/TableComponent.tsx';
import { ReconciledItemsHeader } from './components/ReconciledItemsHeader';
import { NavigationTabs } from './components/NavigationTabs';
import { SearchAndFilters } from './components/SearchAndFilters';

interface Transaction {
  id: string;
  date: string;
  amount: string;
  type: string;
  status: string;
  reconciliationDate: string;
}

const ReconciledItems: React.FC = () => {
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    count: 20,
  });

  // Table columns
  const columns = [
    { key: 'id', label: 'Transaction ID' },
    { key: 'date', label: 'Date' },
    { key: 'amount', label: 'Amount' },
    { key: 'type', label: 'Type' },
    { key: 'status', label: 'Status' },
    { key: 'reconciliationDate', label: 'Reconciliation Date' },
  ];

  // Sample data
  const transactions: Transaction[] = [
    {
      id: 'TXN12345',
      date: '2024-01-15',
      amount: '$500.00',
      type: 'Payment',
      status: 'Reconciled',
      reconciliationDate: '2024-01-16',
    },
    {
      id: 'TXN67890',
      date: '2024-01-20',
      amount: '$1,200.00',
      type: 'Refund',
      status: 'Reconciled',
      reconciliationDate: '2024-01-21',
    },
    {
      id: 'TXN11223',
      date: '2024-02-05',
      amount: '$750.00',
      type: 'Payment',
      status: 'Reconciled',
      reconciliationDate: '2024-02-06',
    },
    {
      id: 'TXN44556',
      date: '2024-02-10',
      amount: '$300.00',
      type: 'Adjustment',
      status: 'Reconciled',
      reconciliationDate: '2024-02-11',
    },
    {
      id: 'TXN77889',
      date: '2024-02-15',
      amount: '$900.00',
      type: 'Payment',
      status: 'Reconciled',
      reconciliationDate: '2024-02-16',
    },
  ];

  return (
    <div className="h-full bg-gray-50 text-gray-900 overflow-auto">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <ReconciledItemsHeader className="bg-transparent" />
        
        <div className="mt-6">
          <NavigationTabs className="bg-transparent" />
        </div>
        
        <div className="mt-6">
          <SearchAndFilters className="bg-transparent" />
        </div>
        
        <div className="mt-6">
          <CustomTableComponent
            columns={columns}
            rows={transactions}
            isLoading={false}
            isPaginated={true}
            params={params}
            setParams={setParams}
            classNames={{
              base: 'bg-white rounded-lg shadow-sm border border-gray-200',
              table: 'min-h-[400px]',
              thead: 'bg-gray-50',
              th: 'bg-gray-50 text-gray-700 font-semibold text-sm uppercase tracking-wider',
              tr: 'hover:bg-gray-50 border-b border-gray-100',
              td: 'text-gray-900 text-sm py-4',
              tbody: 'bg-white divide-y divide-gray-100',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ReconciledItems;
