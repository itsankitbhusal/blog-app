import React from "react";
import { useState } from "react";
import BASE_URL from "../../constant/constant";
import Sidebar from "../dashboard/Sidebar";

const AddCategory = () => {
  const [category, setCategory] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const handelSubmit = async () => {
    if (category === "") {
      setErrorMessage("Please enter a category name");
      return;
    }
    const data = await addCategory();
    if (data.error) {
      setErrorMessage(data.error);
    }

    if (data.data.id) {
      // alert("Category added successfully");
      setSuccessMessage("Category added successfully");
      setCategory("");
    } else {
      // alert("Something went wrong");
      setErrorMessage("Something went wrong");
    }
  };
  const addCategory = async () => {
    // http://localhost:8000/category/add
    const response = await fetch(`${BASE_URL}/category/add/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: category }),
    });
    const data = await response.json();
    return data;
  };
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="main w-full">
          <div className="flex flex-col m-8 mx-16">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Add Category
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                      Add a new category
                    </p>
                  </div>
                  <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
                    <div className="grid items-center gap-4">
                      <div className="grid gap-2">
                        <label
                          htmlFor="category"
                          className="block text-xl font-medium "
                        >
                          Category Name
                        </label>
                        <input
                          type="text"
                          name="category"
                          id="category"
                          value={category ? category : ""}
                          onChange={(e) => setCategory(e.target.value)}
                          autoComplete="given-name"
                          placeholder="Enter a category name"
                          className="py-2 px-4 bg-gray-100 focus:ring-brand-primary focus:border-brand-primary shadow-sm sm:text-sm border-gray-300 rounded-sm"
                        />
                      </div>
                      <span>
                        {successMessage ? (
                          <p className="text-green-500 text-sm">
                            {successMessage}
                          </p>
                        ) : (
                          <p className="text-red-500 text-sm">{errorMessage}</p>
                        )}
                      </span>
                      <div className="my-4">
                        <button
                          onClick={handelSubmit}
                          className="inline-flex justify-center py-3 px-8 border border-transparent shadow-sm text-sm rounded-md text-white bg-brand-primary hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary font-semibold uppercase"
                        >
                          Add Category
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCategory;
