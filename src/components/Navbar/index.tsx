import Link from "next/link";
import { usePathname } from "next/navigation";
function Navbar() {
  const navigation = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Todo",
      path: "/todos",
    },
  ];

  const pathname = usePathname();

  return (
    <header className="bg-cyan-500 px-5 sm:10 md:px15 lg:px-24 py-2 text-white">
      <div className="flex flex-row justify-between items-center">
        <div className="text-2xl font-bold">
          <Link href={"/"}>Knitto Test</Link>
        </div>

        <div className="flex gap-x-2">
          {navigation.map((val, key) => {
            const isActive = pathname === val.path;
            return (
              <Link
                key={key}
                href={val.path}
                className={`${isActive && "font-bold"}`}
              >
                <div className="px-2 py-1 hover:bg-cyan-700 active:bg-cyan-900 rounded-md hover:cursor-pointer">
                  {val.name}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
