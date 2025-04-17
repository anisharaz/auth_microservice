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
import { Header } from "./header";
import { Social } from "./social";
import { BackButton } from "./back-button";
import { emailSignup } from "@/app/actions/email-signup";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

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
        <Header
          title={"Ready to start your exciting journey ?"}
          label={
            "Signup to our website and start leading through your meta life today!"
          }
        />
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
        <BackButton
          label={"Already have an account? Login"}
          href={"/auth/login"}
        />
      </CardFooter>
    </Card>
  );
};
