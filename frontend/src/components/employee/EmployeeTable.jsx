import { useNavigate } from "react-router-dom";

function EmployeeTable({ employees }) {
  const navigate = useNavigate();

  return (
    <div className="overflow-x-auto rounded-lg bg-white shadow">
      <table className="min-w-full">
        <thead className="bg-slate-800 text-white">
          <tr>
            <th className="px-6 py-3 text-left">Name</th>
            <th className="px-6 py-3 text-left">Email</th>
            <th className="px-6 py-3 text-left">Phone</th>
            <th className="px-6 py-3 text-left">Department</th>
            <th className="px-6 py-3 text-left">Salary</th>
            <th className="px-6 py-3 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id} className="border-b hover:bg-gray-50">
              <td className="px-6 py-4">{employee.name}</td>
              <td className="px-6 py-4">{employee.email}</td>
              <td className="px-6 py-4">{employee.phone}</td>
              <td className="px-6 py-4">{employee.department}</td>
              <td className="px-6 py-4">₹{employee.salary}</td>

              <td className="px-6 py-4 text-center">
                <button
                  onClick={() => navigate(`/employees/edit/${employee.id}`)}
                  className="mr-2 rounded bg-yellow-500 px-3 py-1 text-white hover:bg-yellow-600"
                >
                  Edit
                </button>

                <button
                  onClick={() => alert(employee.id)}
                  className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeTable;
