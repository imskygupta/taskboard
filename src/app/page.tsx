import { getSession } from "@/lib/auth";
import { getTasks } from "@/app/actions/tasks";
import { MarketingPage } from "@/components/MarketingPage";
import { Dashboard } from "@/components/Dashboard";

export default async function Home() {
  const session = await getSession();

  if (!session) {
    return <MarketingPage />;
  }

  const tasks = await getTasks();

  return <Dashboard initialTasks={tasks} />;
}
