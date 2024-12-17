import { useEffect, useState } from "react";
import TitleCard from "../../../../components/pages/admin-components/TitleCard";
import { useAdminStore } from "../../../../store/adminStore";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../../components/common/Toast";
import Danger from "../../../../components/modals/Danger";
import LoadingSpinner from "../../../../components/common/LoadingSpinner";
import DetailUser from "../../../../components/modals/DetailUser";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import useAuthStore from "../../../../store/authStore";

export default function Users() {
  const {
    users,
    getAllUsers,
    changeRole,
    isLoading,
    softDeleteUser,
    restoreUser,
  } = useAdminStore();
  const { currentUser } = useAuthStore();
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showRestoreModal, setShowRestoreModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState("semua");

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  const filteredUsers =
    selectedRole === "semua"
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

  const handleRestoreModal = (userId) => {
    setSelectedUser(userId);
    setShowRestoreModal(true);
  };

  const handleDeleteUser = async () => {
    try {
      if (selectedUser === currentUser?._id) {
        showErrorToast("Anda tidak dapat menghapus diri Anda");
        setShowDeleteModal(false);
        return;
      }
      setShowDeleteModal(false);
      // const response = await deleteUser(selectedUser);
      const response = await softDeleteUser(selectedUser);
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
      if (selectedUser?._id === currentUser?._id) {
        showErrorToast("Anda tidak dapat mengubah role Anda sendiri");
        setShowUpdateModal(false);
        return;
      }
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

  const handleRestoreUser = async () => {
    try {
      setShowRestoreModal(false);
      const response = await restoreUser(selectedUser);
      if (response.success) {
        getAllUsers();
      }
    } catch (error) {
      console.error(error);
      showErrorToast(
        error.response?.message || "Terjadi kesalahan saat mengaktifkan user"
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
              <option value="semua">Semua</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>

          {/* TABEL PENGGUNA */}
          {filteredUsers.length === 0 ? (
            <p className="text-center text-gray-500">
              Belum ada pengguna
              {selectedRole !== "semua" && ` dengan role ${selectedRole}`}
            </p>
          ) : (
            <div className="relative overflow-x-auto shadow-md rounded-lg">
              <table className="w-full text-sm text-left whitespace-nowrap">
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
                    <th scope="col" className="px-6 py-3 align-middle">
                      Status
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
                  {filteredUsers.map((user) => (
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
                        {user?.createdAt &&
                          format(new Date(user?.createdAt), "dd MMMM yyyy", {
                            locale: id,
                          })}
                      </td>
                      <td className="px-6 py-4 align-middle text-gray-500">
                        {user?.isActive ? "Tidak Aktif" : "Aktif"}
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
                        {user?.isActive ? (
                          <button
                            onClick={() => handleRestoreModal(user?._id)}
                            className="font-medium text-secondary hover:underline"
                          >
                            Pulihkan
                          </button>
                        ) : (
                          <button
                            onClick={() => handleDeleteModal(user._id)}
                            className="font-medium text-red-600 hover:underline"
                          >
                            Hapus
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
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

      {/* Modal Pulihkan */}
      {showRestoreModal && (
        <Danger
          title="Pulihkan Pengguna"
          message="Apakah Anda yakin ingin pulihkan pengguna ini?"
          show={showRestoreModal}
          onClose={() => setShowRestoreModal(false)}
          onSubmit={handleRestoreUser}
        />
      )}
    </div>
  );
}
