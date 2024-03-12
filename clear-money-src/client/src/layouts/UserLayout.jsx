import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';

export default function UserLayout() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 w-full">
        <Navbar />
        <div class="p-4 sm:ml-64">
            <div class="p-4 mt-14">
                <Outlet />
            </div>
        </div>
      </div>
    </div>
  );
}
