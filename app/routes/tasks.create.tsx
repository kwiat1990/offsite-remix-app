import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, Link, useActionData } from "@remix-run/react";
import { useEffect, useRef } from "react";
import { json } from "react-router";
import { prisma } from "~/db.server";

export async function action({ request }: ActionArgs) {
  const formData = await await request.formData();
  const { title, content, email } = Object.fromEntries(formData.entries());
  // const title = formData.get("title");
  // const content = formData.get("content");
  // const authorEmail = formData.get("email");

  if (typeof title !== "string" || title.length === 0) {
    return json(
      {
        errors: {
          title: "Title is required",
          email: null,
        },
      },
      { status: 400 }
    );
  }

  if (typeof email !== "string" || email.length < 3 || !email.includes("@")) {
    return json(
      {
        errors: {
          title: null,
          email: "Email is invalid",
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
          email,
        },
      },
    },
  });

  return redirect("/tasks/drafts");
}

export default function Signup() {
  const actionData = useActionData<typeof action>();
  const titleRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (actionData?.errors?.title) {
      titleRef.current?.focus();
    } else if (actionData?.errors?.emailRef) {
      emailRef.current?.focus();
    }
  }, [actionData]);

  const classes =
    "w-full border-2 border-black block p-3 text-black placeholder:text-black shadow focus-visible:outline-none";
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
            ref={titleRef}
            type="text"
          />
          {actionData?.errors?.title && (
            <div className="text-red-500">{actionData.errors.title}</div>
          )}
        </div>
        <div className="mb-8">
          <input
            aria-invalid={actionData?.errors?.email}
            className={`${classes} ${
              actionData?.errors?.email ? classesError : ""
            }`}
            name="email"
            placeholder="Author (email address)*"
            ref={emailRef}
            type="email"
          />
          {actionData?.errors?.email && (
            <div className="text-red-500">{actionData.errors.email}</div>
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
