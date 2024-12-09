import { useEffect, useState } from "react";
import TitleCard from "../../../../components/pages/admin-components/TitleCard";
import { useAdminStore } from "../../../../store/adminStore";
import formatDate from "../../../../utils/formatDate";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../../components/common/Toast";
import Danger from "../../../../components/modals/Danger";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../../../components/common/LoadingSpinner";
import DetailUser from "../../../../components/modals/DetailUser";
import { useUserStore } from "../../../../store/userStore";

export default function Users() {
  const { users, getAllUsers, deleteUser, changeRole, isLoading } =
    useAdminStore();
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState("all");

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  const filteredUsers =
    selectedRole === "all"
      ? users
      : users.filter((user) => user.role === selectedRole);

  const handleDetailModal = (userId) => {
    setSelectedUser(userId);
    setShowDetailModal(true);
  };

  const handleUpdateModal = (user) => {
    setSelectedUser(user);
    setShowUpdateModal(true);
  };

  const handleDeleteModal = (userId) => {
    setSelectedUser(userId);
    setShowDeleteModal(true);
  };

  const handleDeleteUser = async () => {
    try {
      setShowDeleteModal(false);
      const response = await deleteUser(selectedUser);
      if (response.success) {
        getAllUsers();
      }
    } catch (error) {
      console.error(error);
      showErrorToast(
        error.response?.message || "Terjadi kesalahan saat menghapus user"
      );
    }
  };

  const handleChangeRole = async () => {
    try {
      setShowUpdateModal(false);
      const newRole = selectedUser?.role === "admin" ? "user" : "admin";
      const response = await changeRole(selectedUser._id, newRole);
      if (response.success) {
        showSuccessToast("Role berhasil diubah");
        getAllUsers();
      }
    } catch (error) {
      console.error(error);
      showErrorToast(
        error.response?.message || "Terjadi kesalahan saat mengubah role user"
      );
    }
  };

  return (
    <div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <TitleCard title="Pengguna" />

          {/* Dropdown untuk filter role */}
          <div className="mb-4 flex flex-col items-end">
            <label
              htmlFor="role-filter"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Tampilkan berdasarkan role :
            </label>
            <select
              id="role-filter"
              className="block w-48 px-4 py-2 bg-white rounded-xl shadow focus:outline-secondary sm:text-sm"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              <option value="all">Semua</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>

          {/* TABEL PENGGUNA */}
          <div className="relative overflow-x-auto shadow-md rounded-lg">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100 max-sm:text-center">
                <tr>
                  <th scope="col" className="px-6 py-3 align-middle">
                    Nama Pengguna
                  </th>
                  <th scope="col" className="px-6 py-3 align-middle">
                    Username
                  </th>
                  <th scope="col" className="px-6 py-3 align-middle">
                    Role
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center lg:text-start align-middle"
                  >
                    Tanggal Bergabung
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center align-middle"
                  >
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr className="bg-white border-b hover:bg-gray-50">
                    <td
                      colSpan={5}
                      className="px-6 py-4 text-center align-middle"
                    >
                      Tidak ada data pengguna dengan role {selectedRole}.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr
                      key={user._id}
                      className="bg-white border-b hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 align-middle">
                        <div className="flex items-center">
                          <img
                            className="w-10 h-10 rounded-full"
                            src={user?.image ? user?.image : "/avatar.png"}
                            alt={user?.name}
                          />
                          <div className="ps-3">
                            <div className="text-base font-semibold">
                              {user?.name}
                            </div>
                            <div className="font-normal text-gray-500 w-36 lg:w-64 truncate">
                              {user?.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 align-middle text-gray-500">
                        @{user?.username}
                      </td>
                      <td className="px-6 py-4 align-middle text-gray-500 capitalize">
                        {user?.role}
                      </td>
                      <td className="px-6 py-4 align-middle text-gray-500 text-nowrap">
                        {formatDate(user?.createdAt)}
                      </td>
                      <td className="px-6 py-4 align-middle text-center flex justify-center gap-3">
                        <button
                          onClick={() => handleDetailModal(user)}
                          className="font-medium text-secondary hover:underline"
                        >
                          Lihat
                        </button>
                        <button
                          onClick={() => handleUpdateModal(user)}
                          className="font-medium text-secondary hover:underline"
                        >
                          Ubah
                        </button>
                        <button
                          onClick={() => handleDeleteModal(user._id)}
                          className="font-medium text-red-600 hover:underline"
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Modal Detail User */}
      {showDetailModal && (
        <DetailUser
          title="Detail Pengguna"
          data={selectedUser}
          show={showDetailModal}
          onClose={() => setShowDetailModal(false)}
        />
      )}

      {/* Modal Hapus */}
      {showDeleteModal && (
        <Danger
          title="Hapus Pengguna"
          message="Apakah Anda yakin ingin menghapus pengguna ini?"
          show={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onSubmit={handleDeleteUser}
        />
      )}

      {/* Modal Ubah */}
      {showUpdateModal && (
        <Danger
          title="Ubah Role Pengguna"
          message={`Apakah Anda yakin ingin mengubah role pengguna ini menjadi ${
            selectedUser?.role === "admin" ? "user" : "admin"
          }?`}
          show={showUpdateModal}
          onClose={() => setShowUpdateModal(false)}
          onSubmit={handleChangeRole}
        />
      )}
    </div>
  );
}
