import Link from "next/link";
import { LogOut } from "lucide-react";

export default function AboutPage() {
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
          <Link href="/" className="font-bold tracking-tight">TASK·BOARD</Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <Link href="/#features" className="hover:text-foreground transition-colors">Features</Link>
          <Link href="/#how-it-works" className="hover:text-foreground transition-colors">How it works</Link>
          <Link href="/#stack" className="hover:text-foreground transition-colors">Stack</Link>
          <Link href="/about" className="text-foreground transition-colors font-bold">About</Link>
        </nav>
        
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium hover:text-primary transition-colors">
            Log in
          </Link>
          <Link href="/" className="glass-button text-sm bg-white/5 hover:bg-white/10 hidden sm:block">
            Dashboard
          </Link>
        </div>
      </header>

      {/* about wala content idhar */}
      <main className="relative z-10 max-w-3xl mx-auto px-6 pt-24 pb-32">
        <span className="text-primary font-mono text-sm mb-4 block">/ About</span>
        <h1 className="serif text-5xl sm:text-6xl tracking-tight mb-8">A small demo, built with care.</h1>
        
        <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
          <p>
            Task Board is a minimal full-stack task manager built as a review submission for the Digitally Next assessment. It's intentionally small: sign up, log in, create tasks, move them between Todo, In Progress, and Done.
          </p>
          <p>
            The goal was to take the brief seriously while still shipping something visually considered — clean typography, glass surfaces, motion that supports rather than distracts.
          </p>
        </div>
        
        <div className="mt-16 pt-8 border-t border-border/50 grid sm:grid-cols-2 gap-8">
          <div>
            <h3 className="font-bold text-foreground mb-2">Built by</h3>
            <p className="text-muted-foreground">Akash</p>
            <p className="text-sm text-muted-foreground mt-1 opacity-70">For review only. Not for sale, redistribution, or design copy.</p>
          </div>
          <div>
            <h3 className="font-bold text-foreground mb-2">Contact</h3>
            <a href="mailto:akash@example.com" className="text-primary hover:underline flex items-center gap-1">
              akash@example.com <span className="font-serif">→</span>
            </a>
            <p className="text-sm text-muted-foreground mt-1 opacity-70">For questions about the build, the stack, or to discuss the assessment, drop a note.</p>
          </div>
        </div>
      </main>
      
      {/* footer area hai ye */}
      <footer className="relative z-10 border-t border-border/50 bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
            <p>© 2026 Task Board · Made & copyrighted by Akash for Digitally Next assessment review only.</p>
            <p>Demo build · Not for sale or copy.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
