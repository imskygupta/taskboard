"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { encrypt } from "@/lib/auth";
import { cookies } from "next/headers";

const authSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export async function signup(prevState: any, formData: FormData) {
  const result = authSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return { error: result.error.issues[0].message };
  }

  const { email, password } = result.data;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return { error: "User already exists with this email" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    const session = await encrypt({ userId: user.id, email: user.email });
    const cookieStore = await cookies();
    cookieStore.set("session", session, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 1 day
    });

    return { success: true };
  } catch (error: any) {
    console.error("Signup error:", error);
    return { error: error.message || "An unexpected error occurred" };
  }
}

export async function login(prevState: any, formData: FormData) {
  const result = authSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return { error: result.error.issues[0].message };
  }

  const { email, password } = result.data;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return { error: "Invalid email or password" };
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return { error: "Invalid email or password" };
    }

    const session = await encrypt({ userId: user.id, email: user.email });
    const cookieStore = await cookies();
    cookieStore.set("session", session, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 1 day
    });

    return { success: true };
  } catch (error: any) {
    console.error("Login error:", error);
    return { error: error.message || "An unexpected error occurred" };
  }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}

export async function demoLogin() {
  const email = "demo@example.com";
  const password = "demoPassword123!";
  
  try {
    let user = await prisma.user.findUnique({ where: { email } });
    
    if (!user) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user = await prisma.user.create({
        data: { email, password: hashedPassword },
      });
    }

    const session = await encrypt({ userId: user.id, email: user.email });
    const cookieStore = await cookies();
    cookieStore.set("session", session, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // ek din ka time hai
    });

    return { success: true };
  } catch (error: any) {
    console.error("Demo login error:", error);
    return { error: error.message || "Demo login failed" };
  }
}
