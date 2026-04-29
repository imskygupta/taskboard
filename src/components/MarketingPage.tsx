"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export function MarketingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (heroRef.current) {
      gsap.fromTo(
        ".hero-text",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" }
      );
      
      gsap.fromTo(
        ".graffiti-item",
        { opacity: 0, scale: 0.8, y: 50 },
        { opacity: 1, scale: 1, y: 0, duration: 0.6, stagger: 0.2, ease: "back.out(1.7)", delay: 0.5 }
      );
    }
  }, []);

  return (
    <div className="min-h-screen relative overflow-x-hidden selection:bg-primary selection:text-primary-foreground">
      <div className="aurora-bg" />
      <div className="grain" />
      
      {/* ye navbar hai */}
      <header className="relative z-50 flex items-center justify-between px-6 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary ring-4 ring-primary/20 ring-glow-soft">
            <div className="h-3 w-3 rounded-sm bg-primary-foreground" />
          </div>
          <span className="font-bold tracking-tight">TASK·BOARD</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-foreground transition-colors">How it works</a>
          <a href="#stack" className="hover:text-foreground transition-colors">Stack</a>
          <Link href="/about" className="hover:text-foreground transition-colors">About</Link>
        </nav>
        
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium hover:text-primary transition-colors">
            Log in
          </Link>
          <Link href="/login" className="glass-button text-sm bg-white/5 hover:bg-white/10 hidden sm:block">
            Dashboard
          </Link>
        </div>
      </header>

      {/* akash v-1 hero slider hai */}
      <main ref={heroRef} className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-32">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-1 space-y-8">
            <div className="hero-text inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              v1.0 — A focused task board
            </div>
            
            <h1 className="hero-text serif text-6xl sm:text-7xl lg:text-8xl leading-[0.9] tracking-tighter">
              A task board<br />
              <span className="chrome-text">that gets out</span><br />
              of your way.
            </h1>
            
            <p className="hero-text text-lg text-muted-foreground max-w-md text-balance leading-relaxed">
              Three columns. Todo, In Progress, Done. Sign up, add a task, move it across, ship. No priorities to argue about, no filters to configure.
            </p>
            
            <div className="hero-text flex flex-wrap items-center gap-4 pt-4">
              <Link href="/login" className="glass-button bg-primary text-primary-foreground hover:bg-primary-glow border-transparent flex items-center gap-2">
                Get started free <span className="text-xl leading-none">→</span>
              </Link>
              <a href="#features" className="glass-button bg-white/5 text-foreground hover:bg-white/10">
                See features ↓
              </a>
            </div>
            
            <div className="hero-text pt-12 flex flex-wrap items-center gap-4 text-xs font-mono text-muted-foreground">
              <span>Next.js · App Router</span>
              <span className="text-border">/</span>
              <span>Prisma · SQLite</span>
              <span className="text-border">/</span>
              <span>jose JWT · HTTP-only</span>
              <span className="text-border">/</span>
              <span>zod validation</span>
            </div>
          </div>
          
          <div className="flex-1 relative w-full h-[400px] flex items-center justify-center">
            {/* thoda animations wagera */}
            <div className="graffiti-item absolute top-10 right-20 rotate-12 glass-card p-4 border-l-4 border-l-status-todo shadow-2xl z-10 w-64">
              <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-2">
                <span className="w-2 h-2 rounded-full bg-status-todo" /> TODO
              </div>
              <p className="font-medium text-foreground">Draft project README</p>
            </div>
            
            <div className="graffiti-item absolute top-1/2 left-0 -translate-y-1/2 -rotate-6 glass-card p-4 border-l-4 border-l-status-progress shadow-2xl z-20 w-64 bg-background/80">
              <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-2">
                <span className="w-2 h-2 rounded-full bg-status-progress" /> IN PROGRESS
              </div>
              <p className="font-medium text-foreground">Wire auth with jose JWT</p>
            </div>
            
            <div className="graffiti-item absolute bottom-10 right-10 -rotate-3 glass-card p-4 border-l-4 border-l-status-done shadow-2xl z-30 w-64 bg-background/90">
              <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-2">
                <span className="w-2 h-2 rounded-full bg-status-done" /> DONE
              </div>
              <p className="font-medium text-muted-foreground line-through">Set up Prisma schema</p>
            </div>
            
            {/* peeche ka background */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-accent/10 rounded-full blur-3xl opacity-50 pointer-events-none" />
          </div>
        </div>
      </main>

      {/* features list hai ye */}
      <section id="features" className="relative z-10 border-t border-border/50 bg-surface/50">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="mb-16 max-w-2xl">
            <span className="text-primary font-mono text-sm mb-4 block">/ Features</span>
            <h2 className="serif text-5xl tracking-tight mb-4">Built small, on purpose.</h2>
            <p className="text-xl text-muted-foreground text-balance">
              Every feature is in service of one goal: create tasks, see them, move them, finish them.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
            <div>
              <div className="font-mono text-xs text-muted-foreground mb-4 block">01</div>
              <h3 className="text-xl font-bold mb-2">Just three statuses</h3>
              <p className="text-muted-foreground leading-relaxed">Todo, In Progress, Done. No priorities, no labels, no filters. Stay focused on what matters — finishing.</p>
            </div>
            <div>
              <div className="font-mono text-xs text-muted-foreground mb-4 block">02</div>
              <h3 className="text-xl font-bold mb-2">Yours, scoped to you</h3>
              <p className="text-muted-foreground leading-relaxed">Tasks live behind authentication. You only see what you created. Clean User → Task relationship.</p>
            </div>
            <div>
              <div className="font-mono text-xs text-muted-foreground mb-4 block">03</div>
              <h3 className="text-xl font-bold mb-2">Fast and quiet</h3>
              <p className="text-muted-foreground leading-relaxed">Lightweight UI, optimistic updates, sensible loading and empty states. Responsive on every screen.</p>
            </div>
            <div>
              <div className="font-mono text-xs text-muted-foreground mb-4 block">04</div>
              <h3 className="text-xl font-bold mb-2">Secure by default</h3>
              <p className="text-muted-foreground leading-relaxed">Custom JWT auth with jose. Bcrypt-hashed passwords. HTTP-only cookies. Zod validation server-side.</p>
            </div>
          </div>
        </div>
      </section>

      {/* kaam kaise karta hai */}
      <section id="how-it-works" className="relative z-10 border-t border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="mb-16 max-w-2xl">
            <span className="text-primary font-mono text-sm mb-4 block">/ How it works</span>
            <h2 className="serif text-5xl tracking-tight mb-4">Sign up. Add. Move.</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-card p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 text-6xl font-serif text-white/5 transition-transform group-hover:scale-110 group-hover:-translate-y-2 group-hover:translate-x-2">01</div>
              <h3 className="text-xl font-bold mb-4 relative z-10">Create an account</h3>
              <p className="text-muted-foreground leading-relaxed relative z-10">Email and password. Bcrypt-hashed, sealed in a JWT, stored in an HTTP-only cookie.</p>
            </div>
            <div className="glass-card p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 text-6xl font-serif text-white/5 transition-transform group-hover:scale-110 group-hover:-translate-y-2 group-hover:translate-x-2">02</div>
              <h3 className="text-xl font-bold mb-4 relative z-10">Add a task</h3>
              <p className="text-muted-foreground leading-relaxed relative z-10">One input field. Title only. Validated server-side, written through Prisma to SQLite.</p>
            </div>
            <div className="glass-card p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 text-6xl font-serif text-white/5 transition-transform group-hover:scale-110 group-hover:-translate-y-2 group-hover:translate-x-2">03</div>
              <h3 className="text-xl font-bold mb-4 relative z-10">Update its status</h3>
              <p className="text-muted-foreground leading-relaxed relative z-10">Move between Todo, In Progress, and Done. That's the whole product.</p>
            </div>
          </div>
        </div>
      </section>

      {/* stack details idhar */}
      <section id="stack" className="relative z-10 border-t border-border/50 bg-surface/50">
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          <span className="text-primary font-mono text-sm mb-4 block">/ Tech stack</span>
          <h2 className="serif text-4xl tracking-tight mb-12">What's under the hood.</h2>
          
          <div className="flex flex-wrap justify-center gap-4">
            {['Next.js', 'TypeScript', 'Prisma', 'SQLite', 'jose', 'bcryptjs', 'zod', 'Tailwind', 'GSAP'].map((tech) => (
              <div key={tech} className="px-6 py-3 rounded-full border border-white/10 bg-white/5 font-mono text-sm">
                {tech}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* jaldi start karne ka button */}
      <section className="relative z-10 border-t border-border/50">
        <div className="max-w-3xl mx-auto px-6 py-32 text-center">
          <h2 className="serif text-5xl tracking-tight mb-6">Ready to start?</h2>
          <p className="text-xl text-muted-foreground mb-10">Free, takes a minute, no credit card. Just an email and a password.</p>
          <Link href="/login" className="glass-button bg-primary text-primary-foreground hover:bg-primary-glow inline-flex items-center gap-2 px-8 py-4 text-lg">
            Create your account <span className="text-2xl leading-none">→</span>
          </Link>
        </div>
      </section>

      {/* footer area hai ye */}
      <footer id="about" className="relative z-10 border-t border-border/50 bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary ring-2 ring-primary/20">
                  <div className="h-2 w-2 rounded-sm bg-primary-foreground" />
                </div>
                <span className="font-bold tracking-tight">TASK·BOARD</span>
              </div>
              <p className="text-sm text-muted-foreground max-w-sm">
                A minimal, fast task board. Create tasks, move them across Todo, In Progress, and Done. That's it.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#features" className="hover:text-foreground">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-foreground">How it works</a></li>
                <li><a href="#stack" className="hover:text-foreground">Tech stack</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-foreground">About</Link></li>
                <li><a href="#" className="hover:text-foreground">Privacy</a></li>
                <li><a href="#" className="hover:text-foreground">Terms</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
            <p>© 2026 Task Board · Made & copyrighted by Akash for Digitally Next assessment review only.</p>
            <p>Demo build · Not for sale or copy.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
