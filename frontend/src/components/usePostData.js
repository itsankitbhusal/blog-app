import { useState, useEffect } from 'react';

const usePostData = (apiUrl) => {
    const [postList, setPostList] = useState({});

    useEffect(() => {
        fetchPostList();
    }, [apiUrl]);

    const fetchPostList = async () => {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setPostList(data.data);
    }

    const refreshData = () => setPostList({});

    return [postList, refreshData];
}

export default usePostData;