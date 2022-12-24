import React from "react";
import BASE_URL from "../constant/constant";
import CategoryList from "./category/CategoryList";
import Sidebar from "./dashboard/Sidebar";

const Categories = () => {
  const [categories, setCategories] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      const data = await fetchCategories();
      // console.log(data);
      setCategories(data);
    }

    fetchData();
  }, []);

  const fetchCategories = async () => {
    const response = await fetch(`${BASE_URL}/category/get/`);
    const data = await response.json();
    return data.data;
  };
  return (
    <>
      <div className=" flex">
        <Sidebar />
        <div className="main w-full">
          <CategoryList categories={categories} setCategories={setCategories} />
        </div>
      </div>
    </>
  );
};

export default Categories;
