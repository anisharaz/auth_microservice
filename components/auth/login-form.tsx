"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../schemas";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Social } from "./social";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Header } from "./header";
import { BackButton } from "./back-button";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    setLoading(true);
    const res = await signIn("credentials", {
      ...data,
      redirect: false,
    });
    console.log(res);
    if (res?.error === "CredentialsSignin") {
      form.setError("root", {
        message: "Invalid credentials",
      });
      setLoading(false);
    } else {
      setLoading(false);
      router.push("/home");
    }
  };
  return (
    <Card className={"border-none shadow-none px-6 w-[580px]"}>
      <CardHeader>
        <Header title={"Welcome back"} label={"Please enter your details"} />
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter your email"
                        type="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter your password"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <p className="text-sm text-right text-blue-500 cursor-pointer hover:underline">
                Forgot Password?
              </p>
            </div>
            <Button
              type="submit"
              className="w-full py-5 text-md cursor-pointer"
              disabled={loading}
            >
              Sign in {loading && <Loader2 className="animate-spin" />}
            </Button>
            {form.formState.errors.root && (
              <p className="text-sm text-red-500">
                {form.formState.errors.root.message}
              </p>
            )}
            {error === "OAuthAccountNotLinked" && (
              <p className="text-sm text-red-500">
                {
                  "User Registered using email & password, please login using email & password"
                }
              </p>
            )}
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Social />
      </CardFooter>
      <CardFooter className="flex justify-center">
        <BackButton
          label={"Don't have an account? Sign up"}
          href={"/auth/signup"}
        />
      </CardFooter>
    </Card>
  );
};
