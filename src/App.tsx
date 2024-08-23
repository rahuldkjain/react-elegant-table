import DynamicTable from "./examples/DynamicTable";
import OverflowStaticTable from "./examples/OverflowStaticTable";
import PaginatedStaticTable from "./examples/PaginatedStaticTable";

function App() {
  return (
    <div className="w-full overflow-hidden">
      <OverflowStaticTable />
      <div className="h-4" />
      <DynamicTable />
      <div className="h-4" />
      <PaginatedStaticTable />
    </div>
  );
}

export default App;
