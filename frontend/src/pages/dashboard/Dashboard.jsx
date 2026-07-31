import { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import api from "../../services/api";

function Dashboard() {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    totalDepartments: 0,
    totalSalary: 0,
  });

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await api.get("/employees/dashboard");
        console.log(response.data);
        setStats(response.data.stats);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">Total Employees</h3>
          <p className="text-4xl font-bold mt-2">{stats.totalEmployees}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">Departments</h3>

          <p className="text-4xl font-bold mt-2">{stats.totalDepartments}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">Monthly Salary</h3>

          <p className="text-4xl font-bold mt-2">₹{stats.totalSalary}</p>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
