import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Task } from "~/components/task";
import { prisma } from "~/db.server";

export async function loader() {
  const drafts = await prisma.task.findMany({
    where: { draft: true },
    select: {
      id: true,
      title: true,
      author: true,
    },
  });

  return json({ drafts });
}

export default function Index() {
  const { drafts } = useLoaderData<typeof loader>();
  return (
    <>
      <h1>Secret Backlog 🥷</h1>
      <div className="space-y-8">
        {drafts.map((task) => (
          <Task
            id={task.id}
            author={task.author}
            key={task.id}
            title={task.title}
          />
        ))}
      </div>
    </>
  );
}
