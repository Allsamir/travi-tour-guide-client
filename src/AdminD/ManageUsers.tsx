import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import useSecureAxios from "../hooks/useSecureAxios";
import { useQuery } from "@tanstack/react-query";
import User from "../interfaces/User";
import Swal from "sweetalert2";

const ManageUsers: React.FC = () => {
  const secureAxios = useSecureAxios();
  const [tableIndex, setTabelIndex] = useState<number>();
  const {
    isError,
    isLoading,
    data: users,
    refetch,
  } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => (await secureAxios.get(`/users`)).data,
  });
  const handleRole = (id: string, role: string, index: number) => {
    console.log(index);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, Make him/her ${role}!`,
    }).then((result) => {
      if (result.isConfirmed) {
        secureAxios
          .patch(`/users/changeRole?role=${role}&id=${id}`)
          .then((res) => {
            if (res.data.success) {
              Swal.fire({
                title: "Successful",
                text: `${res.data.message}`,
                icon: "success",
                confirmButtonText: "Close",
              });
              setTabelIndex(index);
              refetch();
            }
          })
          .catch((err) => console.error(err));
      }
    });
  };
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen text-2xl font-semibold">
        Error loading Users details
      </div>
    );
  }
  console.log(users);
  return (
    <>
      <Helmet>
        <title>Travi - Dashboard | Manage Users</title>
      </Helmet>
      <div className="container mx-auto px-4">
        <div className="my-20">
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Requested</th>
                  <th>Action</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user: User, index: number) => (
                  <tr className="font-semibold">
                    <th>{index + 1}</th>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>{user.requested ? "Yes" : "Not Yet"}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-outline text-secondaryColor hover:border-none uppercase hover:bg-secondaryColor hover:text-primaryColor"
                        onClick={() => handleRole(user._id, "guide", index)}
                        disabled={
                          user.role === "admin" ||
                          tableIndex === index ||
                          user.changedRole
                        }
                      >
                        Make Guide
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-outline text-secondaryColor hover:border-none uppercase hover:bg-secondaryColor hover:text-primaryColor"
                        onClick={() => handleRole(user._id, "admin", index)}
                        disabled={
                          user.role === "admin" ||
                          tableIndex === index ||
                          user.changedRole
                        }
                      >
                        Make Admin
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageUsers;
