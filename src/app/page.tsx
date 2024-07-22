import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold">
          find{" "}
          <span className="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-[#1db954] relative inline-block">
            <span className="relative text-white">tunes</span>
          </span>
          <p className="text-sm mt-5">
            Discover Albums From Your Favorite Artists
          </p>
        </h1>
        <Button
          asChild
          variant="outline"
          className="text-black-400 hover:no-underline px-5 py-5 bg-transparent"
        >
          <Link href="/user">Get Started</Link>
        </Button>
      </div>
    </main>
  );
}
