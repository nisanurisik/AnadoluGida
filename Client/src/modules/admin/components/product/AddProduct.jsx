import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../../shared/components/Button";
import { getCategories } from "../../../../shared/services/categoryService";
import { addProduct } from "../../../../shared/services/productService";

const AddProduct = () => {
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [discount, setDiscount] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addProduct({
      productName,
      price: parseFloat(price),
      stock: parseInt(stock),
      description,
      discount,
      categoryId: parseInt(categoryId),
    });
    navigate("/product");
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Add Product</h2>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="select select-bordered w-full max-w-xs"
          required
        >
          <option disabled value="">
            Pick a category
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.categoryName}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Product name"
          className="input input-bordered w-full max-w-xs"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Price"
          className="input input-bordered w-full max-w-xs"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Stock"
          className="input input-bordered w-full max-w-xs"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
        />

        <textarea
          placeholder="Description"
          className="textarea textarea-bordered w-full max-w-xs"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <label className="label cursor-pointer">
          <span className="label-text">Is Discounted?</span>
          <input
            type="checkbox"
            className="toggle toggle-secondary ml-2"
            checked={discount}
            onChange={(e) => setDiscount(e.target.checked)}
          />
        </label>

        <Button type="submit" className="btn btn-accent w-fit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AddProduct;
