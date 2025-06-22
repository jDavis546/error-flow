import Link from "next/link";
const Navbar = () => {
  return ( 
    <nav className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
      <div className="container mx-auto flex justify-between items-center">
        <Link href='/' className="text-blue-600 text-lg font-bold">
          Error Flow
        </Link>
        <ul className="flex items-center space-x-4">
          <li>
            <Link href="/tickets/new" className="text-gray-700 hover:underline">Create Tickets</Link>
          </li>
          <li>
            <Link href="/tickets" className="hover:underline text-gray-700 transition">My Tickets</Link>
          </li>
          <li>
            <Link href='/login' className="text-blue-600 hover:underline transition">Login</Link>
          </li>
          <li>
            <Link href='/register' className="bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 transition">Register</Link>
          </li>
          <li>
            <form>
              <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
                Logout
              </button>
            </form>
          </li>
        </ul>
      </div>
    </nav>
   );
}
 
export default Navbar;