import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Task } from "~/components/task";
import { prisma } from "~/db.server";

export async function loader() {
  const tasks = await prisma.task.findMany({
    where: { draft: false },
    select: {
      id: true,
      title: true,
      author: true,
    },
  });

  return json({ tasks });
}

export default function Tasks() {
  const { tasks } = useLoaderData<typeof loader>();

  return (
    <>
      <h1>Current Sprint 👨‍💻</h1>
      <div className="space-y-8">
        {tasks.map((task) => (
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
