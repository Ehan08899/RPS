export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
};

export const formatDateShort = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'short'
  });
};

export const getStatusColor = (status) => {
  switch (status) {
    case 'Hadir':
      return 'bg-green-400';
    case 'Izin':
      return 'bg-yellow-400';
    case 'Alfa':
      return 'bg-red-500 text-white';
    default:
      return 'bg-gray-200';
  }
};

export const getCurrentMonth = () => {
  return new Date().toISOString().slice(0, 7);
};

export const downloadBlob = (blob, filename) => {
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
};