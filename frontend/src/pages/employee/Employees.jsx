import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import api from "../../services/api";
import Loader from "../../components/common/Loader";
import EmployeeTable from "../../components/employee/EmployeeTable";
import EmployeeToolbar from "../../components/employee/EmployeeToolbar";
import Pagination from "../../components/employee/Pagination";

function Employees() {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(false);
  const [firstLoading, setFirstLoading] = useState(true);

  const fetchEmployees = async () => {
    try {
      setLoading(true);

      const response = await api.get("/employees", {
        params: {
          page,
          limit,
          search,
          department,
        },
      });

      setEmployees(response.data.employees);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setFirstLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
  }, [search, department]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchEmployees();
    }, 300);

    return () => clearTimeout(timer);
  }, [page, search, department]);

  if (firstLoading) {
    return <Loader />;
  }

  const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this employee?"
  );

  if (!confirmDelete) return;

  try {
    await api.delete(`/employees/${id}`);

    alert("Employee Deleted Successfully");

    fetchEmployees();
  } catch (error) {
    alert(error.response?.data?.message || "Something went wrong");
  }
};

  return (
    <Layout>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Employees</h1>

        <button
          onClick={() => navigate("/employees/add")}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          + Add Employee
        </button>
      </div>

      <EmployeeToolbar
        search={search}
        setSearch={setSearch}
        department={department}
        setDepartment={setDepartment}
      />

      {loading && (
        <p className="mb-3 text-sm font-medium text-blue-600">
          Loading employees...
        </p>
      )}

      <EmployeeTable 
      employees={employees} 
      onDelete={handleDelete}
      />

      <Pagination page={page} totalPages={totalPages} setPage={setPage} />

      <p className="mt-4 text-gray-600">Total Employees: {employees.length}</p>
    </Layout>
  );
}

export default Employees;
