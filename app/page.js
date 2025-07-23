
import Image from "next/image";
import Navbar from "./src/components/NavBar";
import Sidebar from "./src/components/SideBar";
    import Dashboard from "./src/components/Dashboard";
import AddBooks from "./src/components/AddBooks";

export default function Home() {
  return (
    <div className="scroll-smooth">
      <Navbar />
      <Sidebar />
    <Dashboard />
    <AddBooks />
    </div>
  );
}
