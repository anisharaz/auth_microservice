interface HeaderProps {
  title?: string;
  label: string;
  auth?: boolean;
}

export const Header = ({ label, auth, title }: HeaderProps) => {
  return (
    <div
      className={
        auth
          ? "w-full flex flex-col gap-y-3 text-balance"
          : "flex flex-col gap-y-2 items-center"
      }
    >
      <h1 className="text-4xl font-semibold">{title}</h1>
      <p className="text-muted-foreground text-md text-balance">{label}</p>
    </div>
  );
};
