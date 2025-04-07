export const SearchBar = () => {
  return (
    <div className="mt-4 flex justify-center">
      <input
        type="text"
        placeholder="Search articles..."
        className="w-full max-w-xl px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  );
};
