import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const MemberForm = ({ member, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    nama: '',
    umur: '',
    tanggal_lahir: '',
    jabatan: 'Prospect'
  });

  useEffect(() => {
    if (member) {
      setFormData({
        nama: member.nama,
        umur: member.umur,
        tanggal_lahir: member.tanggal_lahir,
        jabatan: member.jabatan
      });
    }
  }, [member]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.nama || !formData.umur || !formData.tanggal_lahir) {
      alert('Semua field harus diisi!');
      return;
    }
    
    onSave(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">
            {member ? 'Edit' : 'Tambah'} Anggota
          </h2>
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
              Nama <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nama lengkap"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Umur <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="umur"
              value={formData.umur}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Umur"
              min="1"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tanggal Lahir <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="tanggal_lahir"
              value={formData.tanggal_lahir}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Jabatan
            </label>
            <select
              name="jabatan"
              value={formData.jabatan}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Prospect">Prospect</option>
              <option value="Anggota">Anggota</option>
              <option value="Eksekutif">Eksekutif</option>
            </select>
          </div>
          
          <div className="flex gap-3 mt-6">
            <button
              onClick={handleSubmit}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors font-medium"
            >
              Simpan
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

export default MemberForm;