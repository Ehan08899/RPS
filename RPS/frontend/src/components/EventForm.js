import React, { useState } from 'react';
import { X } from 'lucide-react';

const EventForm = ({ onSave, onCancel }) => {
  const [tanggal, setTanggal] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!tanggal) {
      alert('Tanggal acara harus diisi!');
      return;
    }
    
    onSave({ tanggal_acara: tanggal });
    setTanggal('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Tambah Acara Formal</h2>
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tanggal Acara <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={tanggal}
              onChange={(e) => setTanggal(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex gap-3 mt-6">
            <button
              onClick={handleSubmit}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors font-medium"
            >
              Tambah
            </button>
            <button
              onClick={onCancel}
              className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition-colors font-medium"
            >
              Batal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventForm;