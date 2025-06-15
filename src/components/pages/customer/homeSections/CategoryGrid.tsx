// src/customer/homeSections/CategoryGrid.tsx
export default function CategoryGrid() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Shop by Category</h2>
      {/* Add your category grid items here */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-white shadow rounded">Electronics</div>
        <div className="p-4 bg-white shadow rounded">Clothing</div>
        <div className="p-4 bg-white shadow rounded">Books</div>
        <div className="p-4 bg-white shadow rounded">Home & Kitchen</div>
      </div>
    </div>
  );
}
