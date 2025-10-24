import React, { useState, useEffect } from 'react';
import AttendanceTable from './components/AttendanceTable';
import FilterBar from './components/FilterBar';
import ExportButton from './components/ExportButton';
import MemberForm from './components/MemberForm';
import EventForm from './components/EventForm';
import { 
  getMembers, 
  createMember, 
  updateMember, 
  deleteMember,
  getEvents,
  createEvent,
  deleteEvent,
  getAttendance,
  updateAttendance
} from './services/api';
import { getCurrentMonth } from './utils/helpers';

function App() {
  const [members, setMembers] = useState([]);
  const [events, setEvents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [filterMonth, setFilterMonth] = useState(getCurrentMonth());
  const [filterJabatan, setFilterJabatan] = useState('ALL');
  const [showAddMember, setShowAddMember] = useState(false);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [filterMonth]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [membersRes, eventsRes, attendanceRes] = await Promise.all([
        getMembers(),
        getEvents(filterMonth),
        getAttendance(filterMonth)
      ]);

      setMembers(membersRes.data);
      setEvents(eventsRes.data);

      // Convert attendance array to object for easier lookup
      const attendanceMap = {};
      attendanceRes.data.forEach(att => {
        attendanceMap[`${att.anggota_id}-${att.acara_id}`] = att.status;
      });
      setAttendance(attendanceMap);
    } catch (error) {
      console.error('Error loading data:', error);
      alert('Gagal memuat data. Pastikan backend sudah berjalan.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddMember = async (data) => {
    try {
      await createMember(data);
      await loadData();
      setShowAddMember(false);
    } catch (error) {
      console.error('Error adding member:', error);
      alert('Gagal menambah anggota. Silakan coba lagi.');
    }
  };

  const handleUpdateMember = async (data) => {
    try {
      await updateMember(editingMember.id, data);
      await loadData();
      setEditingMember(null);
    } catch (error) {
      console.error('Error updating member:', error);
      alert('Gagal mengupdate anggota. Silakan coba lagi.');
    }
  };

  const handleDeleteMember = async (id) => {
    if (window.confirm('Yakin ingin menghapus anggota ini?')) {
      try {
        await deleteMember(id);
        await loadData();
      } catch (error) {
        console.error('Error deleting member:', error);
        alert('Gagal menghapus anggota. Silakan coba lagi.');
      }
    }
  };

  const handleToggleMemberStatus = async (id, aktif) => {
    try {
      await updateMember(id, { aktif });
      await loadData();
    } catch (error) {
      console.error('Error toggling member status:', error);
      alert('Gagal mengubah status anggota. Silakan coba lagi.');
    }
  };

  const handleAddEvent = async (data) => {
    try {
      await createEvent(data);
      await loadData();
      setShowAddEvent(false);
    } catch (error) {
      console.error('Error adding event:', error);
      alert('Gagal menambah acara. Silakan coba lagi.');
    }
  };

  const handleDeleteEvent = async (id) => {
    if (window.confirm('Yakin ingin menghapus acara ini?')) {
      try {
        await deleteEvent(id);
        await loadData();
      } catch (error) {
        console.error('Error deleting event:', error);
        alert('Gagal menghapus acara. Silakan coba lagi.');
      }
    }
  };

  const handleUpdateAttendance = async (memberId, eventId, status) => {
    try {
      await updateAttendance({
        anggota_id: memberId,
        acara_id: eventId,
        status
      });
      
      // Update local state
      setAttendance(prev => ({
        ...prev,
        [`${memberId}-${eventId}`]: status
      }));
    } catch (error) {
      console.error('Error updating attendance:', error);
      alert('Gagal mengupdate absensi. Silakan coba lagi.');
    }
  };

  const filteredMembers = members.filter(m => {
    if (filterJabatan !== 'ALL' && m.jabatan !== filterJabatan) return false;
    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
        {/* Background */}
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'url(/logo.png)',
              backgroundSize: '300px 300px',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          ></div>
        </div>
        <div className="text-xl text-white relative z-10">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Layer */}
      <div className="fixed inset-0 z-0">
        {/* Dark gradient base */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
        
        {/* Large centered logo */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'url(/logo.png)',
            backgroundSize: '500px 500px',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        ></div>
        
        {/* Repeating pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'url(/logo.png)',
            backgroundSize: '120px 120px',
            backgroundRepeat: 'repeat'
          }}
        ></div>
        
        {/* Overlay gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-slate-900/30"></div>
      </div>

      {/* Content Layer */}
      <div className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="bg-white/95 backdrop-blur-md rounded-lg shadow-2xl p-6 mb-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded overflow-hidden flex items-center justify-center bg-white shadow-lg">
                  <img 
                    src="/logo.png" 
                    alt="RipperSpear Logo" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <h1 className="text-3xl font-bold text-gray-800">
                  Absensi Club Motor RipperSpear
                </h1>
              </div>
              <ExportButton 
                filterMonth={filterMonth} 
                filterJabatan={filterJabatan}
              />
            </div>

            <FilterBar
              filterMonth={filterMonth}
              setFilterMonth={setFilterMonth}
              filterJabatan={filterJabatan}
              setFilterJabatan={setFilterJabatan}
              onAddMember={() => setShowAddMember(true)}
              onAddEvent={() => setShowAddEvent(true)}
            />
          </div>

          {/* Attendance Table */}
          <AttendanceTable
            members={filteredMembers}
            events={events}
            attendance={attendance}
            onUpdateAttendance={handleUpdateAttendance}
            onToggleMemberStatus={handleToggleMemberStatus}
            onEditMember={(member) => setEditingMember(member)}
            onDeleteMember={handleDeleteMember}
            onDeleteEvent={handleDeleteEvent}
          />

          {/* Note */}
          <div className="mt-4 bg-yellow-50/95 backdrop-blur-md border-l-4 border-yellow-500 p-4 rounded shadow-xl">
            <p className="text-sm">
              <strong>Note:</strong> Alfa tidak boleh melebihi 3 kali
            </p>
            <p className="text-sm">
              <strong>TBA:</strong> To Be Announced
            </p>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showAddMember && (
        <MemberForm
          onSave={handleAddMember}
          onCancel={() => setShowAddMember(false)}
        />
      )}

      {editingMember && (
        <MemberForm
          member={editingMember}
          onSave={handleUpdateMember}
          onCancel={() => setEditingMember(null)}
        />
      )}

      {showAddEvent && (
        <EventForm
          onSave={handleAddEvent}
          onCancel={() => setShowAddEvent(false)}
        />
      )}
    </div>
  );
}

export default App;