// app/dashboard/page.tsx
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import LinkCard from "@/components/dashboard/LinkCard";
import ClicksChart from "@/components/dashboard/ClicksChart";

export default async function Dashboard() {
  // 1️⃣ Check if user is logged in
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    redirect("/login");
  }

  // 2️⃣ Fetch user and links
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { links: true },
  });

  if (!user) {
    redirect("/login");
  }

  // 3️⃣ Prepare chart data from clicks
  const linkIds = user.links.map((link) => link.id);
  const clicksData = await prisma.click.groupBy({
    by: ["createdAt"],
    where: { linkId: { in: linkIds } },
    _count: { id: true },
  });

  // Aggregate clicks by day
    const clicks = await prisma.click.findMany({
    where: { linkId: { in: linkIds } },
    select: { createdAt: true },
    });

    const chartMap: Record<string, number> = {};
    clicks.forEach((c) => {
    const day = c.createdAt.toISOString().split("T")[0];
    chartMap[day] = (chartMap[day] || 0) + 1;
    });

    const chartData = Object.entries(chartMap)
    .map(([date, clicks]) => ({ date, clicks }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* ================= Clicks Chart ================= */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Clicks Over Time</h2>
        <ClicksChart data={chartData} />
      </div>

      {/* ================= User Links List ================= */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Your Links</h2>
        {user.links.length === 0 ? (
          <p>You haven’t created any links yet.</p>
        ) : (
          <div className="space-y-4">
            {user.links.map((link) => (
              <LinkCard key={link.id} link={link} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}