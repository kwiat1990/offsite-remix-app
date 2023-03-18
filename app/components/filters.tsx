import { Link, useSearchParams } from "@remix-run/react";

interface FiltersProps {
  label: string;
  filters: Filter[];
}

interface Filter {
  name: string;
  value: string;
}

export function Filters({ label, filters }: FiltersProps) {
  const [searchParams] = useSearchParams();
  const activeFilter = searchParams.getAll(label);

  return (
    <>
      <Link
        to="/tasks"
        className={`button py-1 ${activeFilter.length === 0 ? "button--primary" : "button--secondary"
          }`}
      >
        Show all
      </Link>
      {filters.map(({ name, value }) => {
        const search = new URLSearchParams({
          [label]: value,
        }).toString();
        return (
          <Link
            key={value}
            to={{ search }}
            className={`button py-1 ${activeFilter.includes(value)
              ? "button--primary"
              : "button--secondary"
              }`}
          >
            {name}
          </Link>
        );
      })}
    </>
  );
}
