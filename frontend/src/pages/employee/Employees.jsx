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
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  const fetchEmployees = async () => {
    try {
      setLoading(true);

      const response = await api.get(
        `/employees/pagination?page=${page}&limit=${limit}`,
      );

      setEmployees(response.data.employees);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  //   useEffect(() => {
  //     fetchEmployees();
  //   }, []);

  //   useEffect(() => {
  //   const timer = setTimeout(() => {
  //     fetchEmployees();
  //   }, 500);

  //   return () => clearTimeout(timer);
  // }, [search, department]);

  useEffect(() => {
    fetchEmployees();
  }, [page]);

  if (loading) {
    return (
      <Layout>
        <Loader />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
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

      <EmployeeTable employees={employees} />

      <Pagination page={page} totalPages={totalPages} setPage={setPage} />

      <p className="mb-4 text-gray-600">Total Employees: {employees.length}</p>
    </Layout>
  );
}

export default Employees;
