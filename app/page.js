=======
import Image from "next/image";
import Navbar from "./src/components/NavBar";
import Sidebar from "./src/components/SideBar";
    import Dashboard from "../src/components/Dashboard";

export default function Home() {
  return (
    <div className="scroll-smooth">
      <Navbar />
      <Sidebar />
    <Dashboard />
    </div>
  );
}
