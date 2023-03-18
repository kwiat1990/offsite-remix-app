import { Link } from "@remix-run/react";

export interface TaskProps {
  id: number;
  title: string;
  author: Author | null;
  state?: State;
}

export enum State {
  COMPLETED = "completed",
  IN_PROGRESS = "in progress",
  DRAFT = "draft",
}

interface Author {
  name: string | null;
}

export function Task({ id, title, author, state }: TaskProps) {
  const authorName = author ? author.name : "Secret user";

  return (
    <Link
      to={`/tasks/${id}`}
      className="shadow border-2 border-black bg-white p-8 block hover:bg-slate-100"
    >
      <h2 className="mt-0">{title}</h2>
      <div className="flex justify-between">
        <span>Author: {authorName}</span>
        {state === State.COMPLETED && (
          <span className="text-teal-500">Completed</span>
        )}
        {state === State.IN_PROGRESS && (
          <span className="text-yellow-500">In progress</span>
        )}
        {state === State.DRAFT && <span className="text-gray-500">Todo</span>}
      </div>
    </Link>
  );
}
