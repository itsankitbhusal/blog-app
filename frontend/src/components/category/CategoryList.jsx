import React, { useState } from "react";
import BASE_URL from "../../constant/constant";

const CategoryList = ({ categories, setCategories }) => {
  const [showModal, setShowModal] = useState(false);
  // const [singleCategory, setSingleCategory] = useState({});
  const [categoryName, setCategoryName] = useState("");
  const [currentCategoryId, setCurrentCategoryId] = useState(null);

  const handelDelete = async (id) => {
    // take confirmation from user
    const confirmation = window.confirm("Are you sure?");
    if (confirmation) {
      const data = await deleteCategory(id);
      if (data) {
        const updatedCategory = categories.filter(
          (category) => category.id !== id
        );
        setCategories(updatedCategory);
      }
    }
  };
  const deleteCategory = async (id) => {
    // delete category from db
    const response = await fetch(`${BASE_URL}/category/delete/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    // console.log(data);

    return data;
  };
  const handelEdit = async (id) => {
    setShowModal(true);
    setCurrentCategoryId(id);

    // fetch category data by id
    const response = await fetch(`${BASE_URL}/category/get/${id}`);
    const data = await response.json();
    // console.log(data.data);
    setCategoryName(data.data.name);
  };

  const editCategory = async (id) => {
    const response = await fetch(
      `${BASE_URL}/category/update/${currentCategoryId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: categoryName,
        }),
      }
    );
    const data = await response.json();
    // console.log(data);
    if (data) {
      setShowModal(false);
      const updatedCategory = categories.map((category) => {
        if (category.id === currentCategoryId) {
          category.name = categoryName;
        }
        return category;
      });
      setCategories(updatedCategory);
    }
  };

  return (
    <>
      {/* table with 2 columns in tailwind */}
      <div className="flex flex-col justify-center m-8 h-[80vh] ">
        <div className="-my-2 sm:-mx-6 lg:-mx-8 overflow-auto">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 ">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="w-1/2 px-6 py-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Category
                    </th>
                    <th
                      scope="col"
                      className=" px-6 py-3 text-center  text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200 h-1/2 overflow-scroll">
                  {Array.isArray(categories)
                    ? categories.map((category) => (
                        <tr key={category.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center justify-center">
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {category.name}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex gap-4 justify-center">
                            <button
                              onClick={() => handelEdit(category.id)}
                              className="bg-brand-primary border border-brand-primary hover:bg-brand-dark text-white font-bold py-2 px-8 rounded-sm"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handelDelete(category.id)}
                              className=" border border-red-500 hover:bg-red-500 hover:text-white text-red-500 font-bold py-2 px-5 rounded-sm"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    : null}
                </tbody>
              </table>
              {showModal ? (
                <div>
                  <div className="justify-center bg-black bg-opacity-80 items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 outline-none focus:outline-none">
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                      {/*content*/}
                      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                          <h3 className="text-3xl font-semibold">
                            Edit Category
                          </h3>
                          <button
                            className="p-1 ml-auto border-0 text-black opacity-100 mt-[-.5rem] float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                            onClick={() => setShowModal(false)}
                          >
                            <span className="">×</span>
                          </button>
                        </div>
                        {/*body*/}
                        <div className="relative p-6 flex-auto">
                          <div className="my-4 text-gray-600 text-lg leading-relaxed">
                            <div className="flex flex-col">
                              <label
                                className="leading-loose"
                                htmlFor="categoryName"
                              >
                                Category Name
                              </label>
                              <input
                                type="text"
                                id="categoryName"
                                name="categoryName"
                                placeholder="Category Name"
                                value={categoryName}
                                onChange={(e) => {
                                  // console.log(e.target.value);
                                  setCategoryName(e.target.value);
                                }}
                                className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                              />
                            </div>
                          </div>
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                          <button
                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => setShowModal(false)}
                          >
                            Close
                          </button>
                          <button
                            className="bg-brand-primary text-white hover:bg-brand-dark font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={editCategory}
                          >
                            Update
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryList;
