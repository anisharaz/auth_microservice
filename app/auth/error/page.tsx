"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";

function ErrorMessage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  return (
    <p className="mb-6">{error || "Something went wrong. Please try again."}</p>
  );
}

export default function ErrorPage() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white">
      <Card className="p-6 max-w-md w-full text-center bg-white dark:bg-gray-800">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          An Error Occurred
        </h1>
        <Suspense>
          <ErrorMessage />
        </Suspense>
        <div className="flex gap-4 justify-center">
          <Button onClick={() => router.push("/auth/login")}>
            Login again
          </Button>
          <Button variant={"outline"} onClick={() => router.push("/")}>
            Go Back to Home
          </Button>
        </div>
      </Card>
    </div>
  );
}
