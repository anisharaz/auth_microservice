import { auth } from "@/auth";
import LogoutButton from "@/components/auth/logout-button";
export default async function SignInPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (session?.user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col items-center space-y-2">
          <h1 className="text-2xl">Welcome, {session.user.name}</h1>
          <p className="text-lg">You are Logged in</p>
          <div className="flex justify-center gap-3">
            <a
              href="/home"
              className="px-2 py-1 bg-blue-500 text-white rounded"
            >
              Go to Home
            </a>
            <LogoutButton />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex justify-between">
      <div className="flex flex-col justify-center items-center w-full h-screen">
        {children}
      </div>
    </div>
  );
}
