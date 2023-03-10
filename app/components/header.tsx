import { NavLink } from "@remix-run/react";

export function Header() {
  return (
    <nav className="w-full flex gap-12 items-center">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `border-b-2 uppercase hover:text-teal-500 ${
            isActive ? "border-b-teal-500" : "border-b-transparent"
          }`
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/tasks"
        end
        className={({ isActive }) =>
          `border-b-2 uppercase hover:text-teal-500 ${
            isActive ? "border-b-teal-500" : "border-b-transparent"
          }`
        }
      >
        Sprint
      </NavLink>
      <NavLink
        to="/tasks/drafts"
        end
        className={({ isActive }) =>
          `border-b-2 uppercase hover:text-teal-500 ${
            isActive ? "border-b-teal-500" : "border-b-transparent"
          }`
        }
      >
        Backlog
      </NavLink>
      <NavLink to="/tasks/create" className="ml-auto button button--primary">
        + Create task
      </NavLink>
    </nav>
  );
}
