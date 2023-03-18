import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, Link, useActionData, useLoaderData } from "@remix-run/react";
import { json } from "react-router";
import { prisma } from "~/db.server";

export async function loader() {
  const users = await prisma.user.findMany();
  return json({ users });
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const { title, content, user } = Object.fromEntries(formData.entries());

  // const title = formData.get("title");
  // const content = formData.get("content");
  // const user = formData.get("user");

  if (typeof title !== "string" || title.length === 0) {
    return json(
      {
        errors: {
          title: "Title is required",
          user: null,
        },
      },
      { status: 400 }
    );
  }

  if (typeof user !== "string" || title.length === 0) {
    return json(
      {
        errors: {
          title: null,
          user: "User must be selected",
        },
      },
      { status: 400 }
    );
  }

  await prisma.task.create({
    data: {
      title,
      content: content ? String(content) : null,
      author: {
        connect: {
          email: String(user),
        },
      },
    },
  });

  return redirect("/tasks/drafts");
}

export default function Create() {
  const { users } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  const classes =
    "w-full border-2 border-black block p-3 min-h-[60px] text-black placeholder:text-black shadow focus-visible:outline-none";
  const classesError = "border-red-500 shadow-red-500";

  return (
    <>
      <h1>Create new task</h1>
      <Form method="post">
        <div className="mb-8">
          <input
            autoFocus
            aria-invalid={actionData?.errors?.title}
            className={`${classes} ${
              actionData?.errors?.title ? classesError : ""
            }`}
            name="title"
            placeholder="Title*"
            type="text"
          />
          {actionData?.errors?.title && (
            <div className="text-red-500">{actionData.errors.title}</div>
          )}
        </div>
        <div className="mb-8">
          <select
            aria-invalid={actionData?.errors?.user}
            className={`${classes} ${
              actionData?.errors?.user ? classesError : ""
            }`}
            name="user"
          >
            <option disabled selected>
              Choose user*
            </option>
            {users.map((user) => {
              return <option value={user.email}>{user.name}</option>;
            })}
          </select>
          {actionData?.errors?.user && (
            <div className="text-red-500">{actionData.errors.user}</div>
          )}
        </div>
        <textarea
          autoFocus
          className={classes}
          name="content"
          placeholder="Content"
        />
        <div className="flex gap-8 justify-end mt-14">
          <Link className="button button--secondary min-w-[20%]" to="/">
            Cancel
          </Link>
          <button type="submit" className="button button--primary min-w-[20%]">
            Create
          </button>
        </div>
      </Form>
    </>
  );
}
