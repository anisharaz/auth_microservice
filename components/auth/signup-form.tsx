"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "../../schemas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Social } from "./social";
import { emailSignup } from "@/app/actions/email-signup";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import Link from "next/link";

export const SignupForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof signupSchema>) => {
    const res = await emailSignup({ ...data });
    if (res.success) {
      alert("OTP sent to your email");
      router.push(`/auth/signup/verify-email?email=${data.email}`);
    } else {
      alert(res.message);
    }
  };
  return (
    <Card className={"border-none shadow-none px-6 w-[580px]"}>
      <CardHeader>
        <div className={"w-full flex flex-col gap-y-3 text-balance"}>
          <h1 className="text-4xl font-semibold">
            Ready to start your exciting journey ?
          </h1>
          <p className="text-muted-foreground text-md text-balance">
            Signup to our website and start leading through your meta life
            today!
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter your Name"
                        type="text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
            </div>
            <Button
              type="submit"
              className="w-full py-5 text-md cursor-pointer"
              disabled={!form.formState.isValid || form.formState.isSubmitting}
            >
              Sign up{" "}
              {form.formState.isSubmitting && (
                <Loader2 className="animate-spin" />
              )}
            </Button>
          </form>
        </Form>
      </CardContent>

      <CardFooter>
        <Social />
      </CardFooter>

      <CardFooter className="flex justify-center">
        <Button
          variant="link"
          className="font-normal text-sm"
          size="sm"
          asChild
        >
          <Link href={"/auth/login"}>Already have an account? Login</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
