import React, { useEffect, useState } from "react";
import { domain, useSearch } from "../../store";
import axios from "axios";
import { CiSearch } from "react-icons/ci";
import toast from "react-hot-toast";
import { FiChevronDown } from "react-icons/fi";

export default function MenuPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const { searchValue, setSearchValue } = useSearch();

  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const [form, setForm] = useState({});
  const [page, setPage] = useState(1);
const [pageCount, setPageCount] = useState(1);
const pageSize = 9;
const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

const getItem = () => {
  axios
    .get(domain + "/api/items", {
      params: {
        populate: "*",
        pagination: {
          page,
          pageSize,
        },
      },
    })
    .then((res) => {
      setProducts(res.data.data);

      setPageCount(res.data.meta.pagination.pageCount);
    });
};
  const getCategories = () => {
    axios.get(domain + "/api/categories").then((res) => {
      setCategories(res.data.data);
    });
  };

  useEffect(() => {
    getCategories();
    getItem();
  }, [page]);

  useEffect(async () => {

    if (!searchValue.trim()) {
      getItem();
      return;
    }

    const res = await axios.get(domain + "/api/items", {
      params: {
        populate: "*",
        filters: {
          name: {
            $contains: searchValue.trim(),
          },
        },
      },
    });

    setProducts(res.data.data);
  
}, [searchValue]);

  // Open Add Modal
  const openAddModal = () => {
    setForm({
      name: "",
      price: "",
      tag: "",
      categoryId: "",
    });
    setEditMode(false);
    setModalOpen(true);
  };

  // ✏️ Open Edit Modal
  const openEditModal = (item) => {
    setForm({ name: item.name, price: item.price  , categoryId: item.category.id});
    setCurrentId(item.documentId);
    setEditMode(true);
    setModalOpen(true);
  };

 const handleSave = async () => {
  try {
    const addItem = {
      data: {
        name: form.name,
        price: Number(form.price),
        category: form.categoryId,
        tag: "",
      },
    };

    if (editMode) {
      await axios.put(
        `${domain}/api/items/${currentId}`,
        addItem
      );

      toast.success("Item Updated Successfully");
    } else {
      await axios.post(
        `${domain}/api/items`,
        addItem
      );

      toast.success("Item Added Successfully");
    }

    await getItem();

    setModalOpen(false);

    setForm({
      name: "",
      price: "",
      categoryId: "",
      tag: "",
    });

    setEditMode(false);
    setCurrentId(null);

  } catch (err) {
    console.log(err.response?.data);
    toast.error("Something went wrong");
  }
};


  
  // Delete
  const handleDelete = (id) => {
    axios.delete(domain + `/api/items/${id}`).then(() => {
      toast.success("Item Deleted Successfully");
      getItem();
    })
    
  };

  return (
  <div className="p-6 w-full min-h-dvh flex flex-col gap-6">
    
    {/* HEADER */}
    <div className="flex flex-col md:flex-row items-center justify-between gap-4">

      {/* SEARCH */}
      <div className="relative w-full md:w-1/2">
        <CiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-gray-400" />

        <input
          onChange={(e) => setSearchValue(e.target.value)}
          type="text"
          placeholder="Search products..."
          className="
            w-full h-12 pl-11 pr-4
            rounded-xl
            border border-gray-200
            bg-gray-50
            outline-none
            focus:border-emerald-400
            focus:ring-2 focus:ring-emerald-100
            transition
          "
        />
      </div>

      {/* ADD BUTTON */}
      <button
        onClick={openAddModal}
        className="
          bg-emerald-500 hover:bg-emerald-600
          text-white px-6 py-3
          rounded-xl
          shadow-md
          transition
          w-full md:w-auto
        "
      >
        + Add Product
      </button>
    </div>

    {/* PRODUCTS */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

      {products.length === 0 ? (
        <div className="col-span-full text-center text-gray-400 py-10">
          No products found 😴
        </div>
      ) : (
        products.map((item) => (
          <div
            key={item.id}
            className="
             group
              bg-white rounded-2xl
              border border-gray-100
              shadow-sm
              overflow-hidden
              hover:shadow-lg hover:-translate-y-1
              transition-all duration-500
              flex flex-col
            "
          >
            {/* IMAGE */}
            <div className="h-44 bg-gray-100">
              {item.img?.url && (
                <img
                  src={`${domain}${item.img.url}`}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                />
              )}
            </div>

            {/* CONTENT */}
            <div className="p-4 flex flex-col gap-2 flex-1">
              <h2 className="font-semibold text-lg text-gray-800">
                {item.name}
              </h2>

              <p className="text-emerald-600 font-bold">
                {item.price} $
              </p>

              {/* BUTTONS */}
              <div className="flex gap-2 mt-auto pt-3">

                <button
                  onClick={() => openEditModal(item)}
                  className="
                    flex-1 py-2
                    bg-emerald-500 hover:bg-emerald-600
                    text-white rounded-lg
                    transition
                  "
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(item.documentId)}
                  className="
                    flex-1 py-2
                    bg-red-500 hover:bg-red-600
                    text-white rounded-lg
                    transition
                  "
                >
                  Delete
                </button>

              </div>
            </div>
          </div>
        ))
      )}

    </div>

    {/* PAGINATION */}
    <div className="flex justify-center mt-8 gap-2 flex-wrap">

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => setPage(p)}
          className={`
            px-4 py-2 rounded-lg border transition
            ${
              page === p
                ? "bg-emerald-500 text-white border-emerald-500"
                : "bg-white hover:bg-gray-100"
            }
          `}
        >
          {p}
        </button>
      ))}

    </div>

    {/* MODAL (UI ONLY IMPROVEMENT) */}
    {modalOpen && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">

        <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl">

          <h2 className="text-xl font-bold mb-5">
            {editMode ? "Update Product" : "Add Product"}
          </h2>

          <div className="flex flex-col gap-3">

            <input
              placeholder="Product name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full  border border-gray-200
            rounded-xl
            py-3 pl-8
            text-sm
            outline-none
            transition-all duration-300
            focus:border-emerald-400
            focus:shadow-md
            focus:ring-2 focus:ring-emerald-100
            bg-white
            "
            />
        

            <input
              placeholder="Price"
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="w-full  border border-gray-200
            rounded-xl
            py-3 pl-8
            text-sm
            outline-none
            transition-all duration-300
            focus:border-emerald-400
            focus:shadow-md
            focus:ring-2 focus:ring-emerald-100
            bg-white"
            />

            {/* CATEGORY */}
         <div className="relative w-full">

  <select
    value={form.categoryId}
    onChange={(e) =>
      setForm({ ...form, categoryId: e.target.value })
    }
    className="
      w-full
      appearance-none   /* 👈 ده أهم سطر */
      border border-gray-200
      rounded-xl
      py-4 pl-4 pr-10
      text-sm
      outline-none
      transition-all duration-300
      focus:border-emerald-400
      focus:shadow-md
      focus:ring-2 focus:ring-emerald-100
      bg-white
    "
  >
    <option value="">Select category</option>

    {categories.map((cat) => (
      <option key={cat.id} value={cat.id}>
        {cat.name}
      </option>
    ))}
  </select>

  {/* CUSTOM ARROW */}
 
    <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
  

</div>

          </div>

          {/* ACTIONS */}
          <div className="flex gap-2 mt-5">

            <button
              onClick={() => setModalOpen(false)}
              className="flex-1 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition duration-500 cursor-pointer"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              className="flex-1 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition duration-500 cursor-pointer"
            >
              {editMode ? "Update" : "Save"}
            </button>

          </div>

        </div>
      </div>
    )}

  

  </div>
);
}


