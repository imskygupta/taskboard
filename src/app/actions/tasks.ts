"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

const taskSchema = z.object({
  title: z.string().trim().min(1, { message: "Task title cannot be empty" }),
});

const statusSchema = z.object({
  id: z.string(),
  status: z.enum(["Todo", "In Progress", "Done"]),
});

export async function getTasks() {
  const session = await getSession();
  if (!session?.userId) {
    throw new Error("Unauthorized");
  }

  try {
    const tasks = await prisma.task.findMany({
      where: { userId: session.userId },
      orderBy: { createdAt: "desc" },
    });
    return tasks;
  } catch (error) {
    throw new Error("Failed to fetch tasks");
  }
}

export async function createTask(prevState: any, formData: FormData) {
  const session = await getSession();
  if (!session?.userId) {
    return { error: "Unauthorized" };
  }

  const result = taskSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return { error: result.error.issues[0].message };
  }

  try {
    await prisma.task.create({
      data: {
        title: result.data.title,
        userId: session.userId,
        status: "Todo",
      },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    return { error: "Failed to create task" };
  }
}

export async function updateTaskStatus(id: string, status: "Todo" | "In Progress" | "Done") {
  const session = await getSession();
  if (!session?.userId) {
    return { error: "Unauthorized" };
  }

  const result = statusSchema.safeParse({ id, status });
  if (!result.success) {
    return { error: "Invalid status" };
  }

  try {
    // Ensure the task belongs to the user
    const task = await prisma.task.findUnique({ where: { id: result.data.id } });
    if (!task || task.userId !== session.userId) {
      return { error: "Task not found or unauthorized" };
    }

    await prisma.task.update({
      where: { id: result.data.id },
      data: { status: result.data.status },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    return { error: "Failed to update task status" };
  }
}
