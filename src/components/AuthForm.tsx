"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { signup, login, demoLogin } from "@/app/actions/auth";
import { Loader2 } from "lucide-react";
import gsap from "gsap";

export function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const formRef = useRef<HTMLFormElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [state, action, isPending] = useActionState(
    async (prevState: any, formData: FormData) => {
      const res = isLogin ? await login(prevState, formData) : await signup(prevState, formData);
      if (res?.success) {
        window.location.href = "/";
      }
      return res;
    },
    null
  );

  const handleDemoLogin = () => {
    setIsLogin(false);
    if (formRef.current) {
      const emailInput = formRef.current.querySelector('input[name="email"]') as HTMLInputElement;
      const passInput = formRef.current.querySelector('input[name="password"]') as HTMLInputElement;
      if (emailInput && passInput) {
        const randomId = Math.floor(Math.random() * 100000);
        emailInput.value = `demo${randomId}@taskboard.app`;
        passInput.value = "DemoPass123!";
      }
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
      );
    }
  }, [isLogin]);

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="aurora-bg" />
      <div className="grain" />
      
      <div 
        ref={containerRef}
        className="glass-card relative z-10 w-full max-w-md overflow-hidden p-8"
      >
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary ring-4 ring-primary/20 ring-glow-soft">
            <div className="h-3 w-3 rounded-sm bg-primary-foreground" />
          </div>
          <span className="font-bold tracking-tight">TASK·BOARD</span>
        </div>
        
        <div className="mb-8 text-center">
          <h1 className="serif chrome-text text-4xl font-bold tracking-tight">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="mt-2 text-muted-foreground">
            {isLogin 
              ? "Enter your credentials to access your dashboard" 
              : "Sign up to start managing your tasks"}
          </p>
        </div>

        <form action={action} ref={formRef} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground/80">Email</label>
            <input 
              name="email" 
              type="email" 
              required 
              placeholder="name@example.com"
              className="glass-input w-full"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground/80">Password</label>
            <input 
              name="password" 
              type="password" 
              required 
              placeholder="••••••••"
              className="glass-input w-full"
            />
          </div>

          {state?.error && (
            <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
              {state.error}
            </div>
          )}

          <button 
            type="submit" 
            disabled={isPending}
            className="glass-button relative w-full overflow-hidden text-primary-foreground before:absolute before:inset-0 before:-z-10 before:bg-primary before:transition-transform hover:before:scale-105 disabled:opacity-50"
          >
            <span className="flex items-center justify-center gap-2">
              {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
              {isLogin ? "Sign In" : "Sign Up"}
            </span>
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            type="button" 
            onClick={() => setIsLogin(!isLogin)}
            className="text-primary hover:underline focus:outline-none"
          >
            {isLogin ? "Sign up" : "Sign in"}
          </button>
        </div>

        <div className="mt-8 border-t border-border/50 pt-6">
          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full rounded-md border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/20 focus:outline-none focus:ring-2 focus:ring-primary/50 flex justify-center items-center gap-2 transition-colors"
          >
            Auto-fill Demo Credentials
          </button>
        </div>
      </div>
    </div>
  );
}
