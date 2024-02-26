import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Input,
} from "@material-tailwind/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { DialogDefault } from "@/components/Modal";
import { GoAlertFill } from "react-icons/go";
import axiosInstance from "@/utils/axiosConfigure";
import moment from "moment";
const ItemsPerPage = 5;
export function UserTable() {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [allUsers, setallUsers] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedItem, setselectedItem] = useState(null);
  const [isDelete, setisDelete] = useState(false);
  const [isUnSub, setisUnSub] = useState(false);
  const [isUnBlk, setisUnBlk] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  console.log(isUnSub);
  const handleDeleteModalOpen = () => setisDelete(!isDelete);
  const handleUnSubModalOpen = () => setisUnSub(!isUnSub);
  const handleUnblkModalOpen = () => setisUnBlk(!isUnBlk);
  // const handleDelete = async () => {
  //   try {
  //     const { data } = await axiosInstance.delete(
  //       `${import.meta.env.VITE_BASE_URL}/api/categories/${selectedItem?._id}`,
  //     );
  //     console.log(data);
  //     setallUsers((prevData) =>
  //       prevData.filter((item) => item._id !== selectedItem?._id),
  //     );
  //     toast.success(data.message);
  //     setisDelete(false);
  //     setselectedItem(null);
  //   } catch (error) {
  //     setisDelete(false);
  //     setselectedItem(null);
  //     console.log(error);
  //     toast.error("Server error,Please refresh the page...");
  //   }
  // };
  const handleUnsubscribe = async () => {
    try {
      const { data } = await axiosInstance.put(
        `${import.meta.env.VITE_BASE_URL}/api/user/unSubscribedUser`,
        {
          userId: selectedItem?._id,
        },
      );
      console.log(data);
      toast.success(data.message);
      getAllUsers();

      setisUnSub(false);
      setselectedItem(null);
    } catch (error) {
      setisUnSub(false);
      setselectedItem(null);
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  const handleBlockUnBlock = async () => {
    try {
      const { data } = await axiosInstance.put(
        // `${import.meta.env.VITE_BASE_URL}/api/user/blockUnblock`,
        `${import.meta.env.VITE_BASE_URL}/blockMember/${
          selectedItem._id
        }?action=block`,
        {
          userId: selectedItem._id,
          isBlocked: !selectedItem?.isBlocked,
        },
      );
      toast.success(data.message);
      getAllUsers();

      setisUnBlk(false);
      setselectedItem(null);
    } catch (error) {
      setisUnBlk(false);
      setselectedItem(null);
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  const getAllUsers = async () => {
    try {
      setloading(true);
      const { data } = await axiosInstance.get(
        `${
          import.meta.env.VITE_BASE_URL
          // }/api/user/getAllUsers?currentPage=${currentPage}&pageSize=5&searchQuery=${searchQuery}`,
        }/members?currentPage=${currentPage}&pageSize=5&searchQuery=${searchQuery}`,
      );
      setallUsers(data.users);
      setTotalPages(data.totalPages);
      setTotalCount(data.totalUsers);
      setloading(false);
      console.log(data);
    } catch (error) {
      setloading(false);
      console.log(error);
      toast.error("Server error,Please refresh the page...");
    }
  };
  useEffect(() => {
    getAllUsers();
  }, [currentPage, searchQuery]);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      {isDelete && (
        <DialogDefault
          handleChange={handleDelete}
          handleOpen={handleDeleteModalOpen}
          icon={<GoAlertFill size={45} />}
          open={isDelete}
          text="Are you sure you want to delete this category? Keep in mind that all associated blogs will also be deleted?"
          buttonText="Confirm"
        />
      )}
      {isUnSub && (
        <DialogDefault
          handleChange={handleUnsubscribe}
          handleOpen={handleUnSubModalOpen}
          icon={<GoAlertFill size={45} />}
          open={isUnSub}
          text="Are you sure you want to un subscribe this user?"
          buttonText="Confirm"
        />
      )}
      {isUnBlk && (
        <DialogDefault
          handleChange={handleBlockUnBlock}
          handleOpen={handleUnblkModalOpen}
          icon={<GoAlertFill size={45} />}
          open={isUnBlk}
          text={`Are you sure you want to ${
            selectedItem?.isBlocked ? "Unblock" : "block"
          }  this user?`}
          buttonText="Confirm"
        />
      )}

      <Card>
        <CardHeader
          variant="gradient"
          className="mb-8 p-6 flex justify-between items-center bg-secondary"
        >
          <Typography variant="h6" className="text-dark">
            All Users
          </Typography>
          <div>
            <div class="pt-2 relative mx-auto ">
              <input
                class=" bg-white h-10 px-5 pr-16 rounded-3xl text-sm focus:outline-none"
                type="search"
                name="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search"
              />
              <button type="submit" class="absolute right-0 top-0 mt-5 mr-4">
                <svg
                  class="text-primary h-4 w-4 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  version="1.1"
                  id="Capa_1"
                  x="0px"
                  y="0px"
                  viewBox="0 0 56.966 56.966"
                  style={{ enableBackground: "new 0 0 56.966 56.966" }}
                  xml:space="preserve"
                  width="512px"
                  height="512px"
                >
                  <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                </svg>
              </button>
            </div>
          </div>
          {/* <div className="mr-auto md:mr-4 md:w-56">
            <Input label="Search" />
          </div> */}
          {/* <Box>
              <Link to='/dashboard/add-category'>
                <Button className="flex items-center justify-center bg-transparent  text-white  bg-dark rounded-3xl hover:bg-gray-800" >
                  <Icon icon='ic:baseline-plus' style={{ fontSize: '24px', marginRight: '5px' }} />
                  Add Category
                </Button>
              </Link>
            </Box> */}
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {[
                  "S#No",
                  "Email address",
                  "Joined",
                  "Subscribed",
                  "Status",
                  "Action",
                ].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-center"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <td colSpan={6}>
                  <div role="status" className="text-center p-3">
                    <svg
                      aria-hidden="true"
                      class="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-primary"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span class="sr-only">Loading...</span>
                  </div>
                </td>
              ) : (
                <>
                  {allUsers?.length ? (
                    allUsers?.map(
                      (
                        { _id, email, createdAt, isBlocked, paymentDetails },
                        key,
                      ) => {
                        const className = `py-3 px-5 text-center ${
                          key === allUsers?.length - 1
                            ? ""
                            : "border-b border-blue-gray-50"
                        }`;

                        return (
                          <tr key={_id}>
                            <td className={className}>
                              <Typography className="text-xs font-semibold text-blue-gray-600">
                                {key + 1}
                              </Typography>
                            </td>
                            <td className={className}>
                              <Typography className="text-xs font-semibold text-blue-gray-500">
                                {email}
                              </Typography>
                            </td>

                            <td className={className}>
                              <Typography className="text-xs font-semibold text-blue-gray-600">
                                {moment(createdAt).format("DD/MM/YYYY")}
                              </Typography>
                            </td>
                            <td className={className}>
                              {paymentDetails?.subscriptionStatus ===
                                "active" &&
                              paymentDetails?.membership === "trial" ? (
                                <span class="bg-primary text-white text-xs font-medium me-2 px-2.5 py-1 rounded-full dark:bg-blue-900 dark:text-blue-300">
                                  {" "}
                                  Trial
                                </span>
                              ) : (
                                <>
                                  {paymentDetails?.subscriptionStatus ===
                                  "active" ? (
                                    <span class="bg-green-800 text-white text-xs font-medium me-2 px-2.5 py-1 rounded-full dark:bg-blue-900 dark:text-blue-300">
                                      {" "}
                                      Paid
                                    </span>
                                  ) : (
                                    <span class="bg-red-800 text-white text-xs font-medium me-2 px-2.5 py-1 rounded-full dark:bg-blue-900 dark:text-blue-300">
                                      {" "}
                                      Expired
                                    </span>
                                  )}
                                </>
                              )}
                            </td>
                            <td className={className}>
                              {isBlocked ? (
                                <span class="bg-red-800 text-white text-xs font-medium me-2 px-2.5 py-1 rounded-full dark:bg-blue-900 dark:text-blue-300">
                                  {" "}
                                  Block
                                </span>
                              ) : (
                                <span class="bg-green-800 text-white text-xs font-medium me-2 px-2.5 py-1 rounded-full dark:bg-blue-900 dark:text-blue-300">
                                  {" "}
                                  Active
                                </span>
                              )}
                            </td>
                            <td className={className}>
                              <Menu>
                                <MenuHandler>
                                  <Button
                                    variant="text"
                                    className="bg-transparent hover:bg-transparent hover:shadow-none focus:bg-transparent focus:shadow-none"
                                  >
                                    {" "}
                                    <BsThreeDotsVertical className="text-black" />
                                  </Button>
                                </MenuHandler>
                                <MenuList>
                                  {paymentDetails?.subscriptionStatus ===
                                    "active" &&
                                  paymentDetails?.membership !== "trial" ? (
                                    <>
                                      <MenuItem
                                        onClick={() => {
                                          setisUnSub(true);
                                          setselectedItem({ _id });
                                        }}
                                      >
                                        {" "}
                                        Unsubscribed
                                      </MenuItem>
                                    </>
                                  ) : null}
                                  {isBlocked ? (
                                    <MenuItem
                                      onClick={() => {
                                        setselectedItem({ _id, isBlocked });
                                        setisUnBlk(true);
                                      }}
                                    >
                                      {" "}
                                      UnBlock
                                    </MenuItem>
                                  ) : (
                                    <MenuItem
                                      onClick={() => {
                                        setselectedItem({ _id, isBlocked });
                                        setisUnBlk(true);
                                      }}
                                    >
                                      {" "}
                                      Block
                                    </MenuItem>
                                  )}

                                  {/* <MenuItem
                                    onClick={() => {
                                      setisDelete(true);
                                      setselectedItem({ _id });
                                    }}
                                  >
                                    Delete
                                  </MenuItem> */}
                                </MenuList>
                              </Menu>
                            </td>
                          </tr>
                        );
                      },
                    )
                  ) : (
                    <td colSpan={8} className="text-center">
                      <span className="text-sm"> No record found</span>
                    </td>
                  )}
                </>
              )}
            </tbody>
          </table>
          <div class="w-full flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div class="flex flex-1 justify-between sm:hidden">
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Previous
              </button>
              <button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Next
              </button>
            </div>
            <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  <span>Showing</span>
                  <span className="ms-1 font-medium">
                    {(currentPage - 1) * ItemsPerPage + 1}
                  </span>
                  <span className="ms-1">to</span>
                  <span className="ms-1 font-medium">
                    {Math.min(currentPage * ItemsPerPage, totalCount)}
                  </span>
                  <span className="ms-1">of</span>
                  <span className="ms-1 font-medium">{totalCount}</span>
                  <span className="ms-1">results</span>
                </p>
              </div>

              <div>
                <nav
                  class="isolate inline-flex -space-x-px rounded-md shadow-sm"
                  aria-label="Pagination"
                >
                  <button
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    href="#"
                    class="relative inline-flex items-center rounded-l-md px-2 py-2 text-primary ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  >
                    <span class="sr-only">Previous</span>
                    <svg
                      class="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => {
                    // Display only the buttons for adjacent pages to the current page
                    if (
                      i === 0 || // Always show the first page
                      i === totalPages - 1 || // Always show the last page
                      Math.abs(i - currentPage) <= 1 || // Show pages within one page from the current page
                      (i < 2 && currentPage < 3) || // Show first two pages if the current page is within the first three
                      (i > totalPages - 3 && currentPage > totalPages - 3) // Show last two pages if the current page is within the last three
                    ) {
                      return (
                        <button
                          key={i}
                          onClick={() => handlePageChange(i + 1)}
                          disabled={currentPage === i + 1}
                          className={`relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
                            currentPage === i + 1
                              ? "bg-primary text-dark"
                              : "text-gray-700"
                          }`}
                        >
                          {i + 1}
                        </button>
                      );
                    }
                    // Render a placeholder button for pages not within the range to condense the display
                    if (
                      (i === 1 && currentPage >= 4) || // Display if current page is beyond the first three
                      (i === totalPages - 2 && currentPage <= totalPages - 4) // Display if current page is before the last three
                    ) {
                      return (
                        <button
                          key={i}
                          onClick={() => handlePageChange(i + 1)}
                          disabled={true}
                          className="px-4 py-2 text-sm font-semibold text-gray-700 pointer-events-none"
                        >
                          ...
                        </button>
                      );
                    }
                  })}

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                    href="#"
                    class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  >
                    <span class="sr-only">Next</span>
                    <svg
                      class="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
