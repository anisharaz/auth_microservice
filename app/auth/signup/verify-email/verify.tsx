"use client";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { verifyOtp } from "@/app/actions/email-signup";
import { Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function VerifyOtp() {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  if (!email) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full">
        <h1 className="text-3xl font-bold underline underline-offset-4">
          Email not found
        </h1>
      </div>
    );
  }

  async function HandleSubmit() {
    if (value.length < 6) {
      alert("enter valid otp");
      return;
    }
    setLoading(true);
    const res = await verifyOtp({
      email: email!,
      otp: value,
    });
    if (res.success) {
      alert("email verified , proceed to login");
      router.push(`/auth/login`);
    } else {
      setLoading(true);
      alert(res.message);
    }
  }
  return (
    <>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Verify OTP</CardTitle>
          <CardDescription>OTP is sent to your email</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center">
            <InputOTP maxLength={6} onChange={(value) => setValue(value)}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            size={"lg"}
            onClick={HandleSubmit}
            className="mx-auto hover:cursor-pointer"
          >
            Verify {loading && <Loader2 className="animate-spin" />}
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
