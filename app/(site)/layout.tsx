import { Header, Footer } from "@/components/Chrome";
import { ClientBoot } from "@/components/client";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ClientBoot />
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
