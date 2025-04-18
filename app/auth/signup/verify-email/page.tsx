import { Suspense } from "react";
import VerifyOtp from "./verify";

function VerifyOtpPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyOtp />
    </Suspense>
  );
}

export default VerifyOtpPage;
