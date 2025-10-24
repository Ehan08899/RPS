import React from 'react';
import { Calendar, Filter, Plus } from 'lucide-react';

const FilterBar = ({
  filterMonth,
  setFilterMonth,
  filterJabatan,
  setFilterJabatan,
  onAddMember,
  onAddEvent
}) => {
  return (
    <div className="flex gap-4 items-center flex-wrap">
      <div className="flex items-center gap-2">
        <Calendar size={20} className="text-gray-600" />
        <input
          type="month"
          value={filterMonth}
          onChange={(e) => setFilterMonth(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div className="flex items-center gap-2">
        <Filter size={20} className="text-gray-600" />
        <select
          value={filterJabatan}
          onChange={(e) => setFilterJabatan(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="ALL">Semua Jabatan</option>
          <option value="Prospect">Prospect</option>
          <option value="Anggota">Anggota</option>
          <option value="Eksekutif">Eksekutif</option>
        </select>
      </div>
      
      <button
        onClick={onAddMember}
        className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
      >
        <Plus size={18} />
        Tambah Anggota
      </button>
      
      <button
        onClick={onAddEvent}
        className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors"
      >
        <Plus size={18} />
        Tambah Acara
      </button>
    </div>
  );
};

export default FilterBar;