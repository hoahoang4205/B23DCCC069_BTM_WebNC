import Link from "next/link";
import { auth, signOut } from "@/auth";

export async function Header() {
  const session = await auth();

  return (
    <header className="border-b border-gray-200 bg-white">
      <nav className="mx-auto flex min-h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="text-lg font-bold text-gray-900">
          BTVN08
        </Link>

        {session?.user ? (
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="text-sm font-medium text-gray-700 hover:text-blue-700"
            >
              Dashboard
            </Link>
            {session.user.role === "admin" && (
              <Link
                href="/admin"
                className="text-sm font-medium text-gray-700 hover:text-blue-700"
              >
                Admin
              </Link>
            )}
            <span className="hidden text-sm text-gray-600 sm:inline">
              {session.user.name ?? session.user.email}
            </span>
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium capitalize text-blue-700">
              {session.user.role}
            </span>
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/login" });
              }}
            >
              <button
                type="submit"
                className="text-sm font-medium text-gray-700 hover:text-red-700"
              >
                Đăng xuất
              </button>
            </form>
          </div>
        ) : (
          <Link
            href="/login"
            className="text-sm font-medium text-blue-700 hover:text-blue-800"
          >
            Đăng nhập
          </Link>
        )}
      </nav>
    </header>
  );
}
