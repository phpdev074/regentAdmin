import { useEffect, useState } from 'react';
import { deleteUser, getUserList } from '../../api/helper';
import { ShowToast } from '../../helpers/ToastService';
import Pagination from '../Pagination';
import { useNavigate } from 'react-router-dom';

const TableThree = () => {

  const navigate = useNavigate();

  const [info, setInfo] = useState<any>([])
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data , setData]= useState<any>()

  // Function to open the modal
  const openModal = (value:any) => {
    console.log(value,'====>>value');
    navigate('/businessDetails', {
      state: value,
    });
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getUserData = async (page = 1) => {
    const response = await getUserList(`?limit=10&page=${page}`)
    setInfo(response.data.data)
  }

  useEffect(() => {
    getUserData()
  }, [])


  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    getUserData(pageNumber);
  };

  const handelDelete = async (id: any) => {
    try {
      const confirm = window.confirm("are you sure you want to delete ?")
      if (confirm) {
        const response = await deleteUser(`?id=${id}`)
        ShowToast(response.data.message, 'success')
        getUserData()
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Name
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Email
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Status
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {info && (info as any)?.users?.map((packageItem: any, key: any) => (
              <tr key={key}>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {packageItem?.name ?? 'N/A'}
                  </h5>
                  {/* <p className="text-sm">${packageItem?.name}</p> */}
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {packageItem?.email}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p
                    className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${packageItem?.status === 'Paid'
                        ? 'bg-success text-success'
                        : packageItem?.status === 'Unpaid'
                          ? 'bg-danger text-danger'
                          : 'bg-warning text-warning'
                      }`}
                  >
                    {packageItem?.status??'N/A'}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <button className="hover:text-primary" onClick={()=>openModal(packageItem)}  >
                      <svg
                        className="fill-current"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                          fill=""
                        />
                        <path
                          d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                          fill=""
                        />
                      </svg>
                    </button>
                    <button className="hover:text-primary" onClick={() => handelDelete(packageItem?._id)} >
                      <svg
                        className="fill-current"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                          fill=""
                        />
                        <path
                          d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                          fill=""
                        />
                        <path
                          d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                          fill=""
                        />
                        <path
                          d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                          fill=""
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end mt-4">
            <Pagination
              currentPage={currentPage}
              totalPages={info.totalPages}
              onPageChange={handlePageChange}
            />
          </div>
      </div>
      <div>
      {isModalOpen && (
  <div
    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    onClick={closeModal}
  >
    <div
      className="bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg shadow-lg w-96 p-6 relative"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Close Button */}
      <button
        className="absolute top-2 right-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
        onClick={closeModal}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {/* Modal Header */}
      <h3 className="text-2xl font-semibold text-center mb-4">Business Information</h3>

      {/* Scrollable Content */}
      <div className="max-h-80 overflow-y-auto mb-6">
        {/* User Info */}
        <div className="text-center mb-4">
          <p className="font-semibold">Business Name</p>
          <p className="text-gray-600 dark:text-gray-300">{data.businessName}</p>
        </div>
        <div className="text-center mb-4">
          <p className="font-semibold">Contact Number</p>
          <p className="text-gray-600 dark:text-gray-300">{data.mobileNumber}</p>
        </div>
        <div className="text-center mb-4">
          <p className="font-semibold">Email</p>
          <p className="text-gray-600 dark:text-gray-300">{data.email}</p>
        </div>
        <div className="text-center mb-4">
          <p className="font-semibold">Business Address</p>
          <p className="text-gray-600 dark:text-gray-300">{data.businessAddress}</p>
        </div>

        {/* Additional Business Info */}
        <div className="text-center mb-4">
          <p className="font-semibold">Others</p>
          <p className="text-gray-600 dark:text-gray-300">{data.objectData?.[4]?.others}</p>
        </div>

        {/* Business Website (if exists) */}
        {data.website && (
          <div className="text-center mb-4">
            <p className="font-semibold">Website</p>
            <p className="text-gray-600 dark:text-gray-300">{data.website}</p>
          </div>
        )}
      </div>

      {/* User Image (If available) */}
      {data.userImage && (
        <div className="flex justify-center mb-6">
          <img
            src={data.userImage}
            alt="User QR Code"
            className="w-24 h-24 rounded-full"
          />
        </div>
      )}

      {/* Close Button */}
      <div className="flex justify-center">
        <button
          onClick={closeModal}
          className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-600"
        >
          Close Modal
        </button>
      </div>
    </div>
  </div>
)}

    </div>

    </div>
  );
};

export default TableThree;
