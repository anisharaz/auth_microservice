export default function SignupPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-between">
      <div className="flex flex-col justify-center items-center w-full h-screen">
        {children}
      </div>
    </div>
  );
}
