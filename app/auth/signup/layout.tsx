// import Image from "next/image";

export default function SignupPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-between">
      <div className="absolute">Moneymap</div>
      <div className="flex flex-col justify-center items-center w-1/2">
        {children}
      </div>
      <div className="w-1/2 relative h-screen">
        {/* <Image
          src="https://r2.aaraz.me/digitallife/signup.jpeg"
          alt="login-image"
          fill
          className="object-cover"
        /> */}
      </div>
    </div>
  );
}
