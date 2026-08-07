import { useEffect, useState } from "react";
import Button from "../common/Button";

function EmployeeForm({ onSubmit, initialData }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    salary: "",
  });

  useEffect(() => {
    if (!initialData) return;

    setFormData({
      name: initialData.name || "",
      email: initialData.email || "",
      phone: initialData.phone || "",
      department: initialData.department || "",
      salary: initialData.salary || "",
    });
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      <input
        type="text"
        name="name"
        placeholder="Employee Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full rounded-lg border px-4 py-2"
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Employee Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full rounded-lg border px-4 py-2"
        required
      />

      <input
        type="text"
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
        className="w-full rounded-lg border px-4 py-2"
        required
      />

      <select
        name="department"
        value={formData.department}
        onChange={handleChange}
        className="w-full rounded-lg border px-4 py-2"
        required
      >
        <option value="">Select Department</option>
        <option value="IT">IT</option>
        <option value="HR">HR</option>
        <option value="Finance">Finance</option>
        <option value="Sales">Sales</option>
      </select>

      <input
        type="number"
        name="salary"
        placeholder="Salary"
        value={formData.salary}
        onChange={handleChange}
        className="w-full rounded-lg border px-4 py-2"
        required
      />

      <Button type="submit">
        {initialData ? "Update Employee" : "Add Employee"}
      </Button>

    </form>
  );
}

export default EmployeeForm;

