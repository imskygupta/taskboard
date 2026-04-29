"use client";

import { useActionState, useEffect, useRef, useState, useTransition } from "react";
import { createTask, updateTaskStatus } from "@/app/actions/tasks";
import { logout } from "@/app/actions/auth";
import { Loader2, Plus, LogOut, Send, Search, Calendar, ArrowUpDown, ChevronRight, ChevronLeft } from "lucide-react";
import gsap from "gsap";

type Task = {
  id: string;
  title: string;
  status: string;
  createdAt: Date;
};

const STATUSES = ["Todo", "In Progress", "Done"];

export function Dashboard({ initialTasks }: { initialTasks: Task[] }) {
  const [tasks, setTasks] = useState(initialTasks);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  const [createState, createAction, isCreating] = useActionState(
    async (prevState: any, formData: FormData) => {
      const res = await createTask(prevState, formData);
      if (res?.success) {
        formRef.current?.reset();
        triggerGraffiti("Task Added! +10 XP");
      }
      return res;
    },
    null
  );

  useEffect(() => {
    setTasks(initialTasks);
  }, [initialTasks]);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        ".dashboard-anim",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }
      );
    }
  }, []);

  const triggerGraffiti = (text: string) => {
    const el = document.createElement("div");
    el.className = "fixed bottom-10 right-10 pointer-events-none z-50 text-primary font-bold text-xl font-mono glass-card px-4 py-2 border-primary";
    el.innerText = text;
    document.body.appendChild(el);

    gsap.fromTo(
      el,
      { opacity: 0, y: 20, scale: 0.8 },
      { 
        opacity: 1, 
        y: -100, 
        scale: 1.1, 
        duration: 1.5, 
        ease: "power3.out",
        onComplete: () => {
          gsap.to(el, {
            opacity: 0,
            y: -150,
            duration: 0.5,
            onComplete: () => el.remove()
          });
        }
      }
    );
  };

  const moveTask = (id: string, currentStatus: string, direction: 1 | -1) => {
    const currentIndex = STATUSES.indexOf(currentStatus);
    const newIndex = currentIndex + direction;
    if (newIndex < 0 || newIndex >= STATUSES.length) return;
    
    const nextStatus = STATUSES[newIndex];
    setTasks(tasks.map(t => t.id === id ? { ...t, status: nextStatus } : t));
    
    if (nextStatus === "Done") {
      triggerGraffiti("Ship it! +50 XP");
    } else {
      triggerGraffiti("Moved!");
    }
    
    startTransition(async () => {
      await updateTaskStatus(id, nextStatus as any);
    });
  };

  const renderColumn = (status: string, emptyText: string, dotColor: string) => {
    const colTasks = tasks.filter(t => t.status === status);
    
    return (
      <div className="glass-card p-6 min-h-[400px] flex flex-col dashboard-anim">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${dotColor}`} />
            <h3 className="font-bold tracking-tight text-lg">{status}</h3>
          </div>
          <span className="text-xs font-mono text-muted-foreground">{colTasks.length.toString().padStart(2, '0')}</span>
        </div>
        
        <div className="flex-1 flex flex-col gap-3">
          {colTasks.length === 0 ? (
            <div className="flex-1 flex items-center justify-center border border-dashed border-border/50 rounded-xl p-6">
              <p className="text-muted-foreground text-sm italic">{emptyText}</p>
            </div>
          ) : (
            colTasks.map(task => (
              <div key={task.id} className="glass p-4 rounded-xl relative group hover:bg-white/5 transition-colors">
                <p className={`font-medium ${status === "Done" ? "text-muted-foreground line-through" : "text-foreground"}`}>
                  {task.title}
                </p>
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="font-mono">{new Date(task.createdAt).toISOString().split('T')[0]}</span>
                  <div className="flex items-center gap-2">
                    {status !== "Todo" && (
                      <button 
                        onClick={() => moveTask(task.id, status, -1)}
                        disabled={isPending}
                        className="flex items-center gap-1 bg-white/5 hover:bg-primary hover:text-primary-foreground px-2 py-1 rounded transition-all disabled:opacity-50 font-bold"
                      >
                        <ChevronLeft className="w-4 h-4" /> Prev
                      </button>
                    )}
                    {status !== "Done" && (
                      <button 
                        onClick={() => moveTask(task.id, status, 1)}
                        disabled={isPending}
                        className="flex items-center gap-1 bg-white/5 hover:bg-primary hover:text-primary-foreground px-2 py-1 rounded transition-all disabled:opacity-50 font-bold text-primary"
                      >
                        Next <ChevronRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <div className="aurora-bg" />
      <div className="grain" />
      
      {/* dev banner hai ye */}
      <a href="/docs" className="block relative z-50 bg-primary text-primary-foreground text-center py-2 text-xs font-mono font-bold tracking-widest hover:bg-primary-glow transition-colors">
        FOR DEV AT DIGITALLY-NEXT →
      </a>
      
      {/* dashboard ka navbar */}
      <header className="relative z-50 flex items-center justify-between px-6 py-6 max-w-7xl mx-auto dashboard-anim">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary ring-4 ring-primary/20 ring-glow-soft">
            <div className="h-3 w-3 rounded-sm bg-primary-foreground" />
          </div>
          <span className="font-bold tracking-tight">TASK·BOARD</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <span className="cursor-not-allowed">Features</span>
          <span className="cursor-not-allowed">How it works</span>
          <span className="cursor-not-allowed">Stack</span>
          <span className="cursor-not-allowed">About</span>
        </nav>
        
        <button 
          onClick={async () => {
            await logout();
            window.location.href = "/";
          }}
          className="text-sm font-medium hover:text-destructive transition-colors flex items-center gap-2"
        >
          <LogOut className="h-4 w-4" /> Log out
        </button>
      </header>
      
      <main className="relative z-10 max-w-7xl mx-auto px-6 pb-24" ref={containerRef}>
        
        {/* naya task banane ka form */}
        <div className="glass-card p-6 md:p-8 mb-8 relative overflow-hidden dashboard-anim border-primary/20 bg-background/40 backdrop-blur-3xl shadow-glow-soft">
          <div className="absolute top-6 right-6 bg-primary text-primary-foreground w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xl ring-4 ring-primary/20">
            +
          </div>
          <h2 className="text-2xl font-bold mb-1">Add a task</h2>
          <p className="text-muted-foreground text-sm mb-6">Create with a title. New tasks start in Todo.</p>
          
          <form action={createAction} ref={formRef} className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <input 
                type="text" 
                name="title" 
                required
                placeholder="Type task title here..." 
                className="glass-input w-full pl-4 bg-background/50 placeholder:text-muted-foreground/50 border-white/5 focus:border-primary/50"
              />
            </div>
            <button 
              type="submit"
              disabled={isCreating}
              className="glass-button bg-primary/20 text-primary hover:bg-primary border border-primary/30 hover:border-primary hover:text-primary-foreground transition-all flex items-center justify-center gap-2 whitespace-nowrap min-w-[140px]"
            >
              {isCreating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              Add task
            </button>
          </form>
          {createState?.error && <p className="text-destructive text-sm mt-3">{createState.error}</p>}
        </div>

        {/* filter wale buttons bs show ke liye */}
        <div className="flex flex-col md:flex-row items-center gap-4 mb-8 dashboard-anim">
          <div className="flex-1 relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Filter by title..." 
              className="glass-input w-full pl-10 h-12 text-sm bg-background/50 border-white/5 cursor-not-allowed opacity-70"
              disabled
            />
          </div>
          <div className="flex items-center gap-2 glass-card h-12 px-2 overflow-x-auto w-full md:w-auto opacity-70 cursor-not-allowed border-white/5">
            <Calendar className="w-4 h-4 text-muted-foreground ml-2" />
            <button className="px-3 py-1.5 text-xs font-mono font-bold bg-primary text-primary-foreground rounded-md ml-2" disabled>ALL</button>
            <button className="px-3 py-1.5 text-xs font-mono text-muted-foreground" disabled>TODAY</button>
            <button className="px-3 py-1.5 text-xs font-mono text-muted-foreground" disabled>WEEK</button>
            <button className="px-3 py-1.5 text-xs font-mono text-muted-foreground" disabled>MONTH</button>
          </div>
          <div className="flex items-center gap-2 glass-card h-12 px-2 overflow-x-auto w-full md:w-auto opacity-70 cursor-not-allowed border-white/5">
            <ArrowUpDown className="w-4 h-4 text-muted-foreground ml-2" />
            <button className="px-3 py-1.5 text-xs font-mono font-bold bg-primary text-primary-foreground rounded-md ml-2" disabled>NEWEST</button>
            <button className="px-3 py-1.5 text-xs font-mono text-muted-foreground" disabled>OLDEST</button>
            <button className="px-3 py-1.5 text-xs font-mono text-muted-foreground" disabled>A-Z</button>
          </div>
        </div>

        {/* main 3 boxes */}
        <div className="grid md:grid-cols-3 gap-6">
          {renderColumn("Todo", "Nothing here. Add a task above.", "bg-status-todo")}
          {renderColumn("In Progress", "Nothing in progress.", "bg-status-progress")}
          {renderColumn("Done", "Nothing completed yet.", "bg-status-done")}
        </div>
        
        {tasks.length === 0 && (
          <div className="text-center mt-12 dashboard-anim">
            <p className="text-sm font-mono text-muted-foreground tracking-widest uppercase">
              No tasks yet — Add your first one above.
            </p>
          </div>
        )}

      </main>
    </div>
  );
}
