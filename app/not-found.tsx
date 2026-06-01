import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white text-navy px-4">
      <div className="max-w-xl text-center">
        <h1 className="text-4xl md:text-5xl font-black mb-4">Page Not Found</h1>
        <p className="text-base md:text-lg text-navy/70 mb-8">
          The page you were looking for could not be found. Please return to the homepage.
        </p>
        <Link href="/" className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-orange-600 transition-colors duration-200">
          Back to Home
        </Link>
      </div>
    </main>
  );
}
