function EmployeeToolbar({
  search,
  setSearch,
  department,
  setDepartment,
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <input
        type="text"
        placeholder="Search employee..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-lg border px-4 py-2 md:w-80"
      />

      <select
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
        className="rounded-lg border px-4 py-2"
      >
        <option value="">All Departments</option>
        <option value="IT">IT</option>
        <option value="HR">HR</option>
        <option value="Finance">Finance</option>
        <option value="Sales">Sales</option>
      </select>
    </div>
  );
}

export default EmployeeToolbar;