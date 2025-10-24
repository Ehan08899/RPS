import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { formatDateShort, getStatusColor } from '../utils/helpers';

const AttendanceTable = ({
  members,
  events,
  attendance,
  onUpdateAttendance,
  onToggleMemberStatus,
  onEditMember,
  onDeleteMember,
  onDeleteEvent
}) => {
  const getAttendanceStatus = (memberId, eventId) => {
    const key = `${memberId}-${eventId}`;
    return attendance[key] || 'Alfa';
  };

  const getStatusCounts = (memberId) => {
    const counts = { Hadir: 0, Izin: 0, Alfa: 0 };
    events.forEach(event => {
      const status = getAttendanceStatus(memberId, event.id);
      counts[status]++;
    });
    return counts;
  };

  const getTotalCounts = () => {
    const totals = { Hadir: 0, Izin: 0, Alfa: 0 };
    events.forEach(event => {
      totals.Hadir += members.filter(m => getAttendanceStatus(m.id, event.id) === 'Hadir').length;
      totals.Izin += members.filter(m => getAttendanceStatus(m.id, event.id) === 'Izin').length;
      totals.Alfa += members.filter(m => getAttendanceStatus(m.id, event.id) === 'Alfa').length;
    });
    return totals;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="border border-gray-300 px-3 py-2 w-12">No</th>
            <th className="border border-gray-300 px-4 py-2 min-w-[150px]">Nama Anggota</th>
            <th className="border border-gray-300 px-3 py-2 min-w-[80px]">Status</th>
            {events.map(event => (
              <th key={event.id} className="border border-gray-300 px-3 py-2 min-w-[100px]">
                <div className="flex flex-col items-center gap-1">
                  <span>{formatDateShort(event.tanggal_acara)}</span>
                  <button
                    onClick={() => onDeleteEvent(event.id)}
                    className="text-red-300 hover:text-red-100 transition-colors"
                    title="Hapus acara"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </th>
            ))}
            <th className="border border-gray-300 px-3 py-2 bg-green-700">Hadir</th>
            <th className="border border-gray-300 px-3 py-2 bg-yellow-600">Izin</th>
            <th className="border border-gray-300 px-3 py-2 bg-red-600">Alfa</th>
            <th className="border border-gray-300 px-3 py-2 min-w-[80px]">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {members.length === 0 ? (
            <tr>
              <td colSpan={events.length + 7} className="border border-gray-300 px-4 py-8 text-center text-gray-500">
                Belum ada data anggota. Klik "Tambah Anggota" untuk menambah data.
              </td>
            </tr>
          ) : (
            <>
              {members.map((member, idx) => {
                const counts = getStatusCounts(member.id);
                return (
                  <tr key={member.id} className={!member.aktif ? 'opacity-50' : ''}>
                    <td className="border border-gray-300 px-3 py-2 text-center">{idx + 1}</td>
                    <td className="border border-gray-300 px-4 py-2">{member.nama}</td>
                    <td className="border border-gray-300 px-3 py-2 text-center">
                      <button
                        onClick={() => onToggleMemberStatus(member.id, !member.aktif)}
                        className={`px-3 py-1 rounded text-white text-xs font-bold transition-colors ${
                          member.aktif ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-500 hover:bg-gray-600'
                        }`}
                      >
                        {member.aktif ? 'ON' : 'OFF'}
                      </button>
                    </td>
                    {events.map(event => {
                      const status = getAttendanceStatus(member.id, event.id);
                      return (
                        <td key={event.id} className="border border-gray-300 p-1">
                          <select
                            value={status}
                            onChange={(e) => onUpdateAttendance(member.id, event.id, e.target.value)}
                            disabled={!member.aktif}
                            className={`w-full px-2 py-1 text-center rounded text-xs font-semibold border-0 cursor-pointer ${getStatusColor(status)} ${
                              !member.aktif ? 'cursor-not-allowed' : ''
                            }`}
                          >
                            <option value="Hadir">Hadir</option>
                            <option value="Izin">Izin</option>
                            <option value="Alfa">Alfa</option>
                          </select>
                        </td>
                      );
                    })}
                    <td className="border border-gray-300 px-3 py-2 text-center font-bold bg-green-100">{counts.Hadir}</td>
                    <td className="border border-gray-300 px-3 py-2 text-center font-bold bg-yellow-100">{counts.Izin}</td>
                    <td className="border border-gray-300 px-3 py-2 text-center font-bold bg-red-100">{counts.Alfa}</td>
                    <td className="border border-gray-300 px-2 py-2">
                      <div className="flex gap-1 justify-center">
                        <button
                          onClick={() => onEditMember(member)}
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                          title="Edit anggota"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => onDeleteMember(member.id)}
                          className="text-red-600 hover:text-red-800 transition-colors"
                          title="Hapus anggota"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {members.length > 0 && events.length > 0 && (
                <tr className="bg-gray-200 font-bold">
                  <td colSpan="3" className="border border-gray-300 px-4 py-2 text-center">TOTAL</td>
                  {events.map(event => {
                    const hadir = members.filter(m => getAttendanceStatus(m.id, event.id) === 'Hadir').length;
                    return (
                      <td key={event.id} className="border border-gray-300 px-3 py-2 text-center">{hadir}</td>
                    );
                  })}
                  <td className="border border-gray-300 px-3 py-2 text-center bg-green-200">{getTotalCounts().Hadir}</td>
                  <td className="border border-gray-300 px-3 py-2 text-center bg-yellow-200">{getTotalCounts().Izin}</td>
                  <td className="border border-gray-300 px-3 py-2 text-center bg-red-200">{getTotalCounts().Alfa}</td>
                  <td className="border border-gray-300"></td>
                </tr>
              )}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceTable;