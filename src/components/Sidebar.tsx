export default function Sidebar() {
  return (
    <div className="w-72 bg-gray-100 p-4">
      <h2 className="text-xl font-semibold mb-2">Data Source</h2>

      <select className="w-full mb-4 border p-1">
        <option>temperature_2m</option>
      </select>

      <h3 className="font-medium">Color Rules</h3>

      <div className="space-y-2">
        <div className="flex gap-2">
          <input placeholder="<10" className="w-1/2 border p-1" />
          <input placeholder="Red" className="w-1/2 border p-1" />
        </div>
        <div className="flex gap-2">
          <input placeholder="10-25" className="w-1/2 border p-1" />
          <input placeholder="Blue" className="w-1/2 border p-1" />
        </div>
        <div className="flex gap-2">
          <input placeholder=">=25" className="w-1/2 border p-1" />
          <input placeholder="Green" className="w-1/2 border p-1" />
        </div>
      </div>
    </div>
  );
}
