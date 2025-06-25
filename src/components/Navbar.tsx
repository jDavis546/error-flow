import Link from "next/link";
import { getCurrentUser } from "@/lib/current-user";
import LogoutButton from "./LogoutButton";

const Navbar = async () => {
  const user = await getCurrentUser();

  return ( 
    <nav className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
      <div className="container mx-auto flex justify-between items-center">
        <Link href='/' className="text-blue-600 text-lg font-bold">
          Error Flow
        </Link>
        <ul className="flex items-center space-x-4">
          {user ? (
            <>
              <li>
                <Link href="/tickets/new" className="text-gray-700 hover:underline">Create Tickets</Link>
              </li>
              <li>
                <Link href="/tickets" className="hover:underline text-gray-700 transition">My Tickets</Link>
              </li>
              <li>
                <LogoutButton />
              </li>
            </>
          ): (
            <>
                <li>
                  <Link href='/login' className="text-blue-600 hover:underline transition">Login</Link>
                </li>
                <li>
                  <Link href='/register' className="bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 transition">Register</Link>
                </li>
            </>
          )}
        </ul>
      </div>
    </nav>
   );
}
 
export default Navbar;