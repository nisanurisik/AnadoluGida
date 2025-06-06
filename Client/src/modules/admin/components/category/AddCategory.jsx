import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDepartments } from "../../../../shared/services/departmentService";
import { addCategory } from "../../../../shared/services/categoryService";
import Button from "../../../../shared/components/Button";

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDepartments = async () => {
      const data = await getDepartments();
      setDepartments(data);
    };
    fetchDepartments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addCategory({ categoryName, departmentId: parseInt(departmentId) });
    navigate("/category");
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Add Category</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <select
          className="select"
          value={departmentId}
          onChange={(e) => setDepartmentId(e.target.value)}
          required
        >
          <option disabled value="">
            Select Department
          </option>
          {departments.map((dept) => (
            <option key={dept.id} value={dept.id}>
              {dept.departmentName || dept.title}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Category name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          className="input input-bordered w-full max-w-xs"
          required
        />
        <div className="flex gap-4">
          <Button type="button" className="btn-outline" onClick={() => navigate("/category")}>
            Cancel
          </Button>
          <Button type="submit" className="btn btn-accent w-fit">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddCategory;
