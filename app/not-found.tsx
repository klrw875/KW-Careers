import Link from "@/components/SmartLink";
import { Header, Footer } from "@/components/Chrome";

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main" className="wrap py-24">
        <h1 className="text-4xl font-bold">That page moved.</h1>
        <p className="mt-3 text-lg text-kw-gray-medium">Let’s get you where you were going.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/" className="btn btn-red">Home</Link>
          <Link href="/quiz" className="btn btn-ghost-dark">Find My Career Path</Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
