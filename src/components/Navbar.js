import react from "react";
function Navbar() {
  return (
    <nav className=" flex justify-between text-blue-200 bg-blue-900 mx-auto py-2">
      <div className="logo">
        <span className="font-bold text-xl mx-9 animate-bounce">
          task planner
        </span>
      </div>
      <ul className="flex gap-5 mx-9">
        <li className="cursor-pointer hover:font-bold hover:text-slate-300">
          home
        </li>
        <li className="cursor-pointer hover:font-bold hover:text-slate-300">
          your task
        </li>
      </ul>
    </nav>
  );
}
export default Navbar;
