import { Link } from "@remix-run/react";

export interface TaskProps {
  id: number;
  title: string;
  author: Author | null;
}

interface Author {
  name: string | null;
}

export function Task({ id, title, author }: TaskProps) {
  const authorName = author ? author.name : "Secret user";

  return (
    <Link
      to={`/tasks/${id}`}
      className="shadow border-2 border-black bg-white p-8 block hover:bg-slate-100"
    >
      <h2 className="mt-0">{title}</h2>
      <small>Author: {authorName}</small>
    </Link>
  );
}
