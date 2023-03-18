import { json, LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Filters } from "~/components/filters";
import { State, Task } from "~/components/task";
import { prisma } from "~/db.server";

export async function loader({ request }: LoaderArgs) {
  const url = new URL(request.url);
  const filter = url.searchParams.get("filter");
  let where: Record<string, boolean> = {};

  if (!!filter) {
    where = {
      inProgress: filter === "in-progress",
      completed: filter === "completed",
    };
  }

  const tasks = await prisma.task.findMany({
    where,
    select: {
      id: true,
      title: true,
      author: true,
      completed: true,
      inProgress: true,
    },
  });

  return json({ tasks });
}

export default function Tasks() {
  const { tasks } = useLoaderData<typeof loader>();

  return (
    <>
      <h1>Current Sprint 👨‍💻</h1>
      <div className="flex gap-4 mb-8">
        <Filters
          label="filter"
          filters={[
            { name: "In Progress", value: "in-progress" },
            { name: "Completed", value: "completed" },
          ]}
        />
      </div>
      <div className="space-y-8">
        {tasks.length === 0 && <p> There are no tasks in progress</p>}
        {tasks.map((task) => (
          <Task
            id={task.id}
            author={task.author}
            key={task.id}
            title={task.title}
            state={
              task.completed
                ? State.COMPLETED
                : task.inProgress
                ? State.IN_PROGRESS
                : State.DRAFT
            }
          />
        ))}
      </div>
    </>
  );
}
