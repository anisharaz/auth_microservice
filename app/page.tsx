import { permanentRedirect } from "next/navigation";
function Home() {
  permanentRedirect("/auth/login");
}

export default Home;
