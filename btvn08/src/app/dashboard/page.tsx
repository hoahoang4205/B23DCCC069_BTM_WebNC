import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <section className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-medium text-blue-700">Dashboard</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-900">
          Chào mừng {session.user.name ?? session.user.email}
        </h1>
        <p className="mt-3 text-gray-600">
          Role của bạn là{" "}
          <span className="font-semibold capitalize text-gray-900">
            {session.user.role}
          </span>
          .
        </p>
      </section>
    </main>
  );
}
