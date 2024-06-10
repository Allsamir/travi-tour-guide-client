import React, { FormEvent, useState } from "react";
import { Helmet } from "react-helmet-async";
import useSecureAxios from "../hooks/useSecureAxios";
import { useQuery } from "@tanstack/react-query";
import User from "../interfaces/User";
import Swal from "sweetalert2";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
const ManageUsers: React.FC = () => {
  const secureAxios = useSecureAxios();
  const [tableIndex, setTabelIndex] = useState<number>();
  const [searchValue, setSearchValue] = useState("");
  const [searchRole, setSearchRole] = useState("");
  const {
    isError,
    isLoading,
    data: users,
    refetch,
  } = useQuery({
    queryKey: ["all-users", searchValue, searchRole],
    queryFn: async () =>
      (
        await secureAxios.get(
          `/users?searchIndex=${searchValue}&role=${searchRole}`,
        )
      ).data,
  });
  console.log(searchValue);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const search = e.target as HTMLFormElement;
    setSearchValue(search.searchIndex.value);
  };
  const handleRoleChange = (event: SelectChangeEvent) => {
    console.log(event.target.value);
    setSearchRole(event.target.value);
  };
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
          <div className="searchBox w-full lg:w-1/2 md:w-4/5 mx-auto mt-20 mb-8">
            <form onSubmit={handleSubmit}>
              <label className="input input-bordered flex items-center gap-2">
                <input
                  type="text"
                  className="grow"
                  placeholder="Search Name"
                  name="searchIndex"
                />
                <button type="submit">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-4 h-4 opacity-70 hover:cursor-pointer hover:text-secondaryColor hover:scale-125"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </label>
            </form>
          </div>
          <div className="role-options w-24 mx-auto mb-12">
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={searchRole}
                  label="Age"
                  onChange={handleRoleChange}
                >
                  <MenuItem value={""}>All</MenuItem>
                  <MenuItem value={"guide"}>Guide</MenuItem>
                  <MenuItem value={"user"}>User</MenuItem>
                  <MenuItem value={"admin"}>Admin</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
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
