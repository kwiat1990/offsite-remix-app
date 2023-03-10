import type { ActionArgs, LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, useCatch, useLoaderData } from "@remix-run/react";
import { json } from "react-router";
import { prisma } from "~/db.server";

export const meta: V2_MetaFunction<typeof loader> = ({ data }) => {
  if (!data) {
    return [
      {
        title: "Task not found",
      },
    ];
  }

  return [
    {
      title: data.task.draft ? `${data.task.title} (Draft)` : data.task.title,
    },
  ];
};

export async function action({ request, params }: ActionArgs) {
  const id = params.id;

  switch (request.method) {
    case "PUT":
      await prisma.task.update({
        where: {
          id: Number(id),
        },
        data: {
          draft: false,
        },
      });
      return redirect("/tasks");
    case "DELETE":
      await prisma.task.delete({
        where: {
          id: Number(id),
        },
      });
      return redirect("/");
    default:
      throw json("Not Found", { status: 404 });
  }
}

export async function loader({ params }: LoaderArgs) {
  const id = params.id;

  if (typeof id === "undefined") {
    throw new Response("id not found", { status: 400 });
  }

  const task = await prisma.task.findUnique({
    where: {
      id: Number(id),
    },
    select: {
      id: true,
      title: true,
      draft: true,
      content: true,
      author: true,
    },
  });

  if (!task) {
    throw new Response("task not found", { status: 400 });
  }

  return json({ task });
}

export default function Task() {
  const { task } = useLoaderData<typeof loader>();

  return (
    <div>
      <h2>{task.title}</h2>
      <p className="font-bold">By {task?.author?.name || "Unknown author"}</p>
      <p>{task.content}</p>
      <div className="flex gap-8">
        {task.draft && (
          <Form method="put">
            <button
              type="submit"
              value="undraft"
              name="_undraft"
              className="button button--primary"
            >
              Work on
            </button>
          </Form>
        )}
        <Form method="delete">
          <button
            type="submit"
            value="delete"
            name="_delete"
            className="button bg-red-500 hover:db-red:600 text-white"
          >
            Delete
          </button>
        </Form>
      </div>
    </div>
  );
}

export function CatchBoundary() {
  // this returns { data, status, statusText }
  const caught = useCatch();

  if (caught.status) {
    return <div>Task was not found.</div>;
  }

  // You could also `throw new Error("Unknown status in catch boundary")`.
  // This will be caught by the closest `ErrorBoundary`.
  return (
    <div>
      Something went wrong: {caught.status} {caught.statusText}
    </div>
  );
}
