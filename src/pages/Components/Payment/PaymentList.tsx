import React, { useEffect, useState } from 'react'
import { deleteUser, getPaymetList } from '../../../api/helper';
import { ShowToast } from '../../../helpers/ToastService';
import Pagination from '../../../components/Pagination';

function PaymentList() {

    const [info, setInfo] = useState<any>([])
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState<any>({});

    // Function to open the modal
    const openModal = (values: any) => {
        setIsModalOpen(true);
        setData(values)
    };

    // Function to close the modal
    const closeModal = () => {
        setIsModalOpen(false);
    };

    const getUserData = async (page = 1) => {
        const response = await getPaymetList(`?limit=10&page=${page}`)
          console.log(response.data.data,'===>>response.data.data')
        setInfo(response.data.data)
    }

    useEffect(() => {
        getUserData()
    }, [])

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        getUserData(pageNumber);
    };


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
                            <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                                Amount
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
                        {info && (info as any)?.data?.map((packageItem: any, key: any) => (
                            <tr key={key}>
                                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                    <h5 className="font-medium text-black dark:text-white">
                                        {/* {packageItem?.userId?.name ?? 'N/A'} */}
                                        <p className="text-black dark:text-white">
                                        {packageItem?.userId?.name}
                                    </p>
                                    </h5>
                                    {/* <p className="text-sm">${packageItem?.userId?.name ?? 'N/A'}</p> */}
                                </td>


                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className="text-black dark:text-white">
                                        {packageItem?.userId?.email}
                                    </p>
                                </td>

                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className="text-black dark:text-white">
                                        {packageItem?.amount}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p
                                        className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${packageItem?.status === 'success'
                                            ? 'bg-success text-success'
                                            : packageItem?.status === 'failed'
                                                ? 'bg-danger text-danger'
                                                : 'bg-warning text-warning'
                                            }`}
                                    >
                                        {packageItem?.status ?? 'N/A'}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <div className="flex items-center space-x-3.5">
                                        <button className="hover:text-primary" onClick={() => openModal(packageItem)}  >
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

                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <div className="flex justify-end mt-4">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={info.totalPages}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </table>
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

                            {/* Payment Success Header */}
                            <h3 className="text-2xl font-semibold text-center mb-4 z-10 relative">
                                Payment Success
                            </h3>

                            {/* Scrollable Content */}
                            <div className="max-h-80 overflow-y-auto mb-6">
                                <div className="text-center">
                                    <p className="font-semibold">Name</p>
                                    <p className="text-gray-600 dark:text-gray-300">{data.userId.name}</p>
                                </div>
                                <div className="text-center">
                                    <p className="font-semibold">Email</p>
                                    <p className="text-gray-600 dark:text-gray-300">{data.userId.email}</p>
                                </div>
                                {/* <div className="text-center">
                                    <p className="font-semibold">Mobile Number</p>
                                    <p className="text-gray-600 dark:text-gray-300">{data.userId.mobileNumber}</p>
                                </div> */}
                                <div className="text-center">
                                    <p className="font-semibold">Amount Paid</p>
                                    <p className="text-gray-600 dark:text-gray-300">${data.amount}</p>
                                </div>
                                
                                <div className="text-center">
                                    <p className="font-semibold">Payment Date</p>
                                    <p className="text-gray-600 dark:text-gray-300">
                                    {new Date(data.paymentDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}

                                    </p>
                                </div>
                                
                                
                            </div>

                            {/* User Image */}
                            {/* <div className="flex justify-center mb-6">
                                <img src={data.userId.userImage} alt="User QR Code" className="w-24 h-24 rounded-full" />
                            </div> */}

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
}

export default PaymentList