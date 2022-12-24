import React from "react";

const CategoryList = ({ categories, setCategories }) => {
  const [showModal, setShowModal] = useState(false);

  const handelDelete = async (id) => {
    // code
  };
  const deleteCategory = async (id) => {
    // delete category from db
  };
  const handelEdit = async (id) => {
    // code
  };

  return (
    <>
      {/* table with 2 columns in tailwind */}
      <div className="flex flex-col m-8 mx-16">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Category
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center  text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
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
                            <button className="bg-brand-primary border border-brand-primary hover:bg-brand-dark text-white font-bold py-2 px-8 rounded-sm">
                              Edit
                            </button>
                            <button className=" border border-red-500 hover:bg-red-500 hover:text-white text-red-500 font-bold py-2 px-5 rounded-sm">
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    : null}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryList;
