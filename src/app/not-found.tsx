import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#07090b] flex flex-col items-center justify-center text-center px-4 font-sans">
      <h1 className="text-6xl font-heading font-bold text-white tracking-tightest mb-4">404</h1>
      <h2 className="text-xl font-subheading font-bold text-[#A6B3A0] tracking-tight mb-4">Page Not Found</h2>
      <p className="text-sm font-sans font-normal text-white/80 max-w-md mb-8 tracking-tight">
        The coordinates you are looking for could not be located in our satellite telemetry.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-xl bg-olive text-earth-950 font-subheading font-bold text-sm tracking-tight hover:bg-tea shadow-earth-card transition-all"
      >
        Return to Surface
      </Link>
    </div>
  );
}
