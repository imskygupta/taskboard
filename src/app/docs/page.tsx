import Link from "next/link";

export default function DocsPage() {
  return (
    <div className="min-h-screen relative overflow-x-hidden selection:bg-primary selection:text-primary-foreground">
      <div className="aurora-bg" />
      <div className="grain" />
      
      {/* ye navbar hai */}
      <header className="relative z-50 flex items-center justify-between px-6 py-6 max-w-7xl mx-auto border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary ring-4 ring-primary/20 ring-glow-soft">
            <div className="h-3 w-3 rounded-sm bg-primary-foreground" />
          </div>
          <Link href="/" className="font-bold tracking-tight">TASK·BOARD</Link>
        </div>
        
        <div className="flex items-center gap-4">
          <Link href="/" className="glass-button text-sm bg-white/5 hover:bg-white/10">
            Back to Dashboard
          </Link>
        </div>
      </header>

      {/* documentation yaha hai */}
      <main className="relative z-10 max-w-3xl mx-auto px-6 pt-16 pb-32">
        <span className="text-primary font-mono text-sm mb-4 block">/ Documentation</span>
        <h1 className="serif text-4xl sm:text-5xl tracking-tight mb-12">README.md</h1>
        
        <div className="space-y-6 text-muted-foreground">
          <h2 className="text-2xl font-bold text-foreground">Tech Stack Used</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-foreground">Framework:</strong> Next.js 15 (App Router)</li>
            <li><strong className="text-foreground">Language:</strong> TypeScript</li>
            <li><strong className="text-foreground">Database:</strong> SQLite</li>
            <li><strong className="text-foreground">ORM:</strong> Prisma</li>
            <li><strong className="text-foreground">Styling:</strong> Tailwind CSS v3, CSS variables for Glassmorphism</li>
            <li><strong className="text-foreground">Animations:</strong> GSAP</li>
            <li><strong className="text-foreground">Validation:</strong> Zod</li>
            <li><strong className="text-foreground">Auth Libs:</strong> bcrypt (hashing), jose (JWT)</li>
          </ul>

          <hr className="border-border/50 my-8" />

          <h2 className="text-2xl font-bold text-foreground">Authentication Flow</h2>
          <p>
            The app uses a minimal, secure, custom authentication flow to meet the requirements without relying on heavy third-party providers (like NextAuth or Firebase):
          </p>
          <ol className="list-decimal pl-6 space-y-2">
            <li><strong className="text-foreground">Signup:</strong> User enters email and password. The password is hashed using <code className="bg-white/10 px-1 py-0.5 rounded text-sm text-primary">bcrypt</code> and stored in the database alongside the email.</li>
            <li><strong className="text-foreground">Login:</strong> User enters credentials. We find the user by email and use <code className="bg-white/10 px-1 py-0.5 rounded text-sm text-primary">bcrypt.compare</code> to verify the password.</li>
            <li><strong className="text-foreground">Session Creation:</strong> Upon successful login or signup, the <code className="bg-white/10 px-1 py-0.5 rounded text-sm text-primary">jose</code> library is used to sign a JWT containing the user's ID and email.</li>
            <li><strong className="text-foreground">Cookie Storage:</strong> This JWT is stored in an <code className="bg-white/10 px-1 py-0.5 rounded text-sm text-primary">HttpOnly</code>, <code className="bg-white/10 px-1 py-0.5 rounded text-sm text-primary">Secure</code> cookie named <code className="bg-white/10 px-1 py-0.5 rounded text-sm text-primary">session</code>.</li>
            <li><strong className="text-foreground">Verification:</strong> Server actions and pages read the cookie, verify the JWT signature using <code className="bg-white/10 px-1 py-0.5 rounded text-sm text-primary">jose</code>, and extract the <code className="bg-white/10 px-1 py-0.5 rounded text-sm text-primary">userId</code> to scope database queries.</li>
          </ol>

          <hr className="border-border/50 my-8" />

          <h2 className="text-2xl font-bold text-foreground">Database Schema</h2>
          <p>The schema perfectly models the requested 1-to-many relationship (User → Task).</p>
          <pre className="bg-black/50 p-4 rounded-lg border border-white/10 font-mono text-sm overflow-x-auto text-primary/80">
{`model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  tasks     Task[]
  createdAt DateTime @default(now())
}

model Task {
  id        String   @id @default(cuid())
  title     String
  status    String   @default("Todo") 
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId    String
  createdAt DateTime @default(now())
}`}
          </pre>

          <hr className="border-border/50 my-8" />

          <h2 className="text-2xl font-bold text-foreground">Steps to Run Locally</h2>
          <p>If you have this source code locally, follow these steps to run it:</p>
          <ol className="list-decimal pl-6 space-y-4 mt-4">
            <li>
              <strong className="text-foreground block mb-2">Install Dependencies</strong>
              <pre className="bg-black/50 p-4 rounded-lg border border-white/10"><code>npm install</code></pre>
            </li>
            <li>
              <strong className="text-foreground block mb-2">Setup Database</strong>
              <p className="mb-2">Initialize the SQLite database and run Prisma migrations:</p>
              <pre className="bg-black/50 p-4 rounded-lg border border-white/10"><code>npx prisma db push</code></pre>
            </li>
            <li>
              <strong className="text-foreground block mb-2">Start Development Server</strong>
              <pre className="bg-black/50 p-4 rounded-lg border border-white/10"><code>npm run dev</code></pre>
            </li>
            <li>
              <strong className="text-foreground block mb-2">Open Application</strong>
              <p>Navigate to <a href="http://localhost:3000" target="_blank" rel="noreferrer" className="text-primary hover:underline">http://localhost:3000</a> in your browser.</p>
            </li>
          </ol>
        </div>
      </main>
    </div>
  );
}
