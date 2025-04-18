import { permanentRedirect } from "next/navigation";

function AuthPage() {
  permanentRedirect("/auth/login");
}

export default AuthPage;
