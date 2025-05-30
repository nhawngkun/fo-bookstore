import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import API_URL from '../../config';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/admin/users`);
      setUsers(response.data);
    } catch (error) {
      toast.error('Lỗi khi tải danh sách người dùng');
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
      return;
    }

    try {
      await axios.delete(`${API_URL}/admin/users/${userId}`);
      toast.success('Xóa người dùng thành công');
      fetchUsers(); // Tải lại danh sách
    } catch (error) {
      toast.error('Không thể xóa người dùng');
      console.error('Error deleting user:', error);
    }
  };

  const openUserDetails = (user) => {
    setSelectedUser(user);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Quản lý người dùng</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-slate-800 shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-50 dark:bg-slate-700">
            <tr>
              <th className="py-3 px-4 text-left">Tên</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Vai trò</th>
              <th className="py-3 px-4 text-left">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {users.map(user => (
              <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-slate-700">
                <td className="py-3 px-4 flex items-center space-x-3">
                  <img 
                    src={user.image || "https://via.placeholder.com/40"} 
                    alt={user.name} 
                    className="w-10 h-10 rounded-full object-cover" 
                  />
                  <span>{user.name}</span>
                </td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    user.role?.toLowerCase() === 'admin' 
                      ? 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200' 
                      : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                  }`}>
                    {user.role || 'Người đọc'}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => openUserDetails(user)}
                    className="text-blue-600 hover:text-blue-800 mr-3"
                  >
                    Xem
                  </button>
                  {user.role?.toLowerCase() !== 'admin' && (
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Xóa
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* User Details Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg max-w-lg w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Chi tiết người dùng</h2>
              <button 
                onClick={() => setSelectedUser(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="flex flex-col items-center mb-6">
              <img 
                src={selectedUser.image || 'https://via.placeholder.com/150'} 
                alt={selectedUser.name}
                className="w-24 h-24 rounded-full object-cover mb-3"
              />
              <h3 className="font-semibold text-lg">{selectedUser.name}</h3>
              <span className={`px-2 py-1 rounded text-xs ${
                selectedUser.role?.toLowerCase() === 'admin' 
                  ? 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200' 
                  : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
              }`}>
                {selectedUser.role || 'Người đọc'}
              </span>
            </div>
            
            <div className="space-y-3">
              <div>
                <span className="font-semibold">Email:</span> {selectedUser.email}
              </div>
              <div>
                <span className="font-semibold">Giới tính:</span> {selectedUser.gender || 'Không có thông tin'}
              </div>
              <div>
                <span className="font-semibold">Địa chỉ:</span> {selectedUser.address || 'Không có thông tin'}
              </div>
              <div>
                <span className="font-semibold">Ngày sinh:</span> {selectedUser.dob || 'Không có thông tin'}
              </div>
              <div>
                <span className="font-semibold">Số điện thoại:</span> {selectedUser.phone || 'Không có thông tin'}
              </div>
              <div>
                <span className="font-semibold">Số sách đã đọc:</span> {selectedUser.books || '0'}
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <button 
                onClick={() => setSelectedUser(null)}
                className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 px-4 py-2 rounded"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
