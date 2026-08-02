import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import EmployeeForm from "../../components/employee/EmployeeForm";
import api from "../../services/api";

function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await api.get(`/employees/${id}`);
        console.log(response.data);

        setEmployee(response.data.employee);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleUpdate = async (formData) => {
    try {
      await api.put(`/employees/${id}`, formData);

      alert("Employee Updated Successfully");

      navigate("/employees");
    } catch (error) {
      alert(error.response?.data?.message || "Update Failed");
    }
  };

  if (!employee) {
    return (
      <Layout>
        <h2>Loading...</h2>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1 className="mb-6 text-3xl font-bold">Edit Employee</h1>

      <EmployeeForm initialData={employee} onSubmit={handleUpdate} />
    </Layout>
  );
}

export default EditEmployee;
