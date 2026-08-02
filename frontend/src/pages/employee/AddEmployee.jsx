import Layout from "../../components/layout/Layout";
import EmployeeForm from "../../components/employee/EmployeeForm";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

function AddEmployee() {
  const navigate = useNavigate();

  const handleAddEmployee = async (formData) => {
    try {
      await api.post("/employees", formData);

      alert("Employee Added Successfully");

      navigate("/employees");

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Something went wrong"
      );
    }
  };

  return (
    <Layout>
      <h1 className="mb-6 text-3xl font-bold">
        Add Employee
      </h1>

      <EmployeeForm
        onSubmit={handleAddEmployee}
      />
    </Layout>
  );
}

export default AddEmployee;