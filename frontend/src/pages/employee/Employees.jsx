// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Layout from "../../components/layout/Layout";
// import api from "../../services/api";
// import Loader from "../../components/common/Loader";
// import EmployeeTable from "../../components/employee/EmployeeTable";
// import EmployeeToolbar from "../../components/employee/EmployeeToolbar";
// import Pagination from "../../components/employee/Pagination";

// function Employees() {
//   const navigate = useNavigate();
//   const [employees, setEmployees] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("");
//   const [department, setDepartment] = useState("");
//   const [page, setPage] = useState(1);
//   const [limit] = useState(5);
//   const [totalPages, setTotalPages] = useState(1);

//   const fetchEmployees = async () => {
//     try {
//       setLoading(true);

//       const response = await api.get("/employees", {
//         params: {
//           page,
//           limit,
//           search,
//           department,
//         },
//       });

//       setEmployees(response.data.employees);
//       setTotalPages(response.data.totalPages);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     setPage(1);
//   }, [search, department]);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (page !== 1 && (search || department)) {
//         setPage(1);
//         return;
//       }

//       fetchEmployees();
//     }, 300);

//     return () => clearTimeout(timer);
//   }, [page, search, department]);

//   if (loading) {
//     return (
//       <Layout>
//         <Loader />
//       </Layout>
//     );
//   }

//   return (
//     <Layout>
//       <div className="flex items-center justify-between mb-6">
//         <h1 className="text-3xl font-bold">Employees</h1>

//         <button
//           onClick={() => navigate("/employees/add")}
//           className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
//         >
//           + Add Employee
//         </button>
//       </div>

//       <EmployeeToolbar
//         search={search}
//         setSearch={setSearch}
//         department={department}
//         setDepartment={setDepartment}
//       />

//       <EmployeeTable employees={employees} />

//       <Pagination page={page} totalPages={totalPages} setPage={setPage} />

//       <p className="mb-4 text-gray-600">Total Employees: {employees.length}</p>
//     </Layout>
//   );
// }

// export default Employees;


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

  // Search ya filter change hone par first page
  useEffect(() => {
    setPage(1);
  }, [search, department]);

  // API Call
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchEmployees();
    }, 300);

    return () => clearTimeout(timer);
  }, [page, search, department]);

  // First page loader
  if (firstLoading) {
    return <Loader />;
  }

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

      <EmployeeTable employees={employees} />

      <Pagination
        page={page}
        totalPages={totalPages}
        setPage={setPage}
      />

      <p className="mt-4 text-gray-600">
        Total Employees: {employees.length}
      </p>
    </Layout>
  );
}

export default Employees;