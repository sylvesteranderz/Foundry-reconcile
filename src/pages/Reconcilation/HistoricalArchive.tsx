import React from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';

const HistoricalArchive: React.FC = () => {
  return (
    <div className="h-full bg-gray-50 text-gray-900 overflow-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Historical Archive</h1>
          <p className="text-lg text-gray-600">
            Browse and access past reconciliation data for closed periods.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Filter Dropdowns */}
            <div className="flex gap-3">
              <select className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Date Range</option>
                <option>Last 3 months</option>
                <option>Last 6 months</option>
                <option>Last year</option>
              </select>
              
              <select className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Status</option>
                <option>Closed</option>
                <option>Open</option>
                <option>Pending</option>
              </select>
              
              <select className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Criteria</option>
                <option>All</option>
                <option>High Value</option>
                <option>Low Value</option>
              </select>
            </div>

            {/* Search Bar */}
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon icon="hugeicons:search-01" className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by date, status, or specific criteria"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Export Button */}
            <button className="px-6 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
              <Icon icon="hugeicons:download-01" className="h-5 w-5" />
              Export
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white border border-gray-200 shadow-sm rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PERIOD</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">START DATE</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">END DATE</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">RECONCILED</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">UNRECONCILED</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STATUS</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ACTION</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Q1 2023</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-01-01</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-03-31</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">1880</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">20</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      Closed
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <a href="#" className="text-green-600 hover:text-green-900 flex items-center gap-1">
                      <Icon icon="hugeicons:eye-01" className="h-4 w-4" />
                      View Details
                    </a>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Q2 2023</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-04-01</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-06-30</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">1920</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">15</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      Closed
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <a href="#" className="text-green-600 hover:text-green-900 flex items-center gap-1">
                      <Icon icon="hugeicons:eye-01" className="h-4 w-4" />
                      View Details
                    </a>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Q3 2023</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-07-01</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-09-30</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">1950</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">25</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      Closed
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <a href="#" className="text-green-600 hover:text-green-900 flex items-center gap-1">
                      <Icon icon="hugeicons:eye-01" className="h-4 w-4" />
                      View Details
                    </a>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Q4 2023</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-10-01</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-12-31</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2010</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">18</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      Closed
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <a href="#" className="text-green-600 hover:text-green-900 flex items-center gap-1">
                      <Icon icon="hugeicons:eye-01" className="h-4 w-4" />
                      View Details
                    </a>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Q1 2024</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2024-01-01</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2024-03-31</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2050</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">12</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      Closed
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <a href="#" className="text-green-600 hover:text-green-900 flex items-center gap-1">
                      <Icon icon="hugeicons:eye-01" className="h-4 w-4" />
                      View Details
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoricalArchive;