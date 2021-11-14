import axios from 'axios';
import React from 'react';
import { useForm } from "react-hook-form";
 import './AddProducts.css'
const AddProducts = () => {
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = data => {
        console.log(data);
        axios.post('http://localhost:5000/products', data)
            .then(res => {
                if (res.data.insertedId) {
                    alert('added succesfully');
                    reset();
                }

            })

    }
    return (
        <div className="add-products md:h-screen h-full md:px-28">
            <div className="grid grid-cols-2">
                <form onSubmit={handleSubmit(onSubmit)} className="">
                    <input {...register("name", { required: true, maxLength: 20 })} placeholder="product Name" className="fs-4 rounded" />
                    <textarea {...register("description")} placeholder="Write about Your product" className="fs-5 w-75 rounded" />
                    <input type="number" {...register("price")} placeholder="product Price" className="fs-4 rounded" />
                    <input {...register("rating")} placeholder="product rating" className="fs-4 rounded" />
                    <input {...register("img")} placeholder="image Url" className="fs-4 rounded" />
                    <input type="submit" className="submit bg-danger text-white fs-4 rounded-pill" />
                </form>
            </div>

        </div>
    );
};

export default AddProducts;