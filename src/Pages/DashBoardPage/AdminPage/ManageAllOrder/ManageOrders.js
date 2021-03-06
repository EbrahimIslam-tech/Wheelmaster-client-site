import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { MdDelete } from 'react-icons/md';


const ManageOrders = () => {

    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        setIsLoading(true)
        getData()
    }, [])
    const getData = () => {
        axios.get(' https://salty-river-79195.herokuapp.com/allorder')
            .then((res) => {
                setOrders(res.data)
                setIsLoading(false)
            });
    }

    const handleDeleteOrder = (id) => {
        setIsLoading(true)
        axios.delete(` https://salty-river-79195.herokuapp.com/allorder/${id}`)
            .then(res => {
                setIsLoading(false)
                if (res.data.deletedCount) {
                    const remaining = orders.filter(service => service._id !== id)
                    setOrders(remaining)
                    alert('successfully deleted')
                }
            })
    }


    const handleApproval = (id) => {
        setIsLoading(true)
        axios.put(` https://salty-river-79195.herokuapp.com/allorder/${id}`, { status: "Shipped" })
            .then((res) => {
                setIsLoading(false)
                getData()
            });
    }





    return (
        <div>
            {
                isLoading ? (
                    <div className="flex justify-center my-7">
                        <Spinner animation="border" variant="warning" />
                    </div>

                ) : (
                    <div>

                        <section className="flex flex-col justify-center items-center pt-24 md:mx-0 mx-4 mb-10 ">

                            <p className="font-extrabold text-gray-200 border-b-4 border-yellow-500 text-xl md:text-5xl">Manage All Orders</p>
                        </section>
                        <section className="flex justify-center">
                            <div className="md:w-8/12 mx-10">

                                {
                                    orders.map(order => {
                                        const { _id, serviceName, displayName, img, price, email, status } = order
                                        return (
                                            <div >
                                                <div className="  flex flex-col md:flex-row items-center justify-between mb-3 shadow-md border p-3">
                                                    <div className="flex flex-col md:flex-row">
                                                        <div className="md:mx-0 mx-auto">
                                                            <img src={img} alt="" className=" md:w-24 md:h-24 md:mr-10 w-40" />
                                                        </div>
                                                        <div className="mt-3 mx-mt-0 text-gray-200">
                                                            <h1 className="text-xl font-mono font-bold">{serviceName} </h1>
                                                            <p className="text-yellow-600 font-bold mb-2">{price}</p>
                                                            <p className="font-bold mb-1">User-Name:<span className="font-normal font-mono"> {displayName}</span></p>
                                                            <p className="font-bold mb-1">User-email:<span className="font-normal font-mono"> {email}</span></p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center mt-3 md:mt-0">
                                                        <button
                                                            onClick={() => handleApproval(_id)}
                                                            className={
                                                                status === "Shipped" ?
                                                                    " text-sm no-underline text-green-600 uppercase font-extrabold   bg-yellow-200 px-6 py-2 tracking-widest mr-5" :
                                                                    " text-sm no-underline text-black uppercase font-extrabold   bg-yellow-400 px-6 py-2 tracking-widest mr-5"
                                                            }>
                                                            {
                                                                status === "Shipped" ? "Shipped" : "Approval"
                                                            }
                                                        </button>
                                                        <button onClick={() => handleDeleteOrder(_id)}><MdDelete className=" text-3xl text-red-500" /></button>
                                                    </div>
                                                </div>


                                            </div>

                                        )
                                    })
                                }

                            </div>
                        </section>

                    </div>
                )
            }
        </div>
    );
};

export default ManageOrders;