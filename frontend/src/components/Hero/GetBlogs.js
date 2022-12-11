import React from 'react'
import { useState, useEffect } from 'react';


import BASE_URL from "../../constant/constant"
import BlogCard from './BlogCard';


const GetBlogs = () => {

    const [blog, setBlog] = useState({});

    const fetchBlog = async () => {
        const response = await fetch(`${BASE_URL}/post/get/limit/3`);
        const data = await response.json();
        if (data.message) {
            // console.log(data.data);
            setBlog(data.data);
        }
    }

    useEffect(() => {
        fetchBlog();
    }, []);

    return (
        <>
            <BlogCard blog={blog} />
        </>
    )
}

export default GetBlogs