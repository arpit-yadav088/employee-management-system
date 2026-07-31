function Input({label, type = "text", name, value, onChange, placeholder, }) {
  return (
    <div className="mb-4">
      <label className="mb-2 block text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
      />
    </div>
  );
}

export default Input;