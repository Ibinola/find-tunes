import Image from "next/image";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold">
          find <span className="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-[#1db954] relative inline-block">
            <span className="relative text-white">tunes</span>
          </span>
        </h1>
        {/* <Image
          src="/music-note.svg"
          alt="Music Note"
          width={100}
          height={100}
        /> */}
        {/* <p className="text-red-500 text-xl">Changing the way you share Music</p> */}
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
