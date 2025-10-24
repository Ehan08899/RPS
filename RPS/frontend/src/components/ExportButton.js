import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { exportExcel } from '../services/api';
import { downloadBlob } from '../utils/helpers';

const ExportButton = ({ filterMonth, filterJabatan }) => {
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    try {
      setLoading(true);
      const response = await exportExcel(filterMonth, filterJabatan);
      
      const monthName = new Date(filterMonth + '-01')
        .toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })
        .replace(' ', '_');
      
      downloadBlob(response.data, `Absensi_RipperSpear_${monthName}.xls`);
    } catch (error) {
      console.error('Export error:', error);
      alert('Gagal export data. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={loading}
      className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
    >
      <Download size={20} />
      {loading ? 'Mengexport...' : 'Export Excel'}
    </button>
  );
};

export default ExportButton;