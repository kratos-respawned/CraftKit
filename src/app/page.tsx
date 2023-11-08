import { Footer } from "@/components/Footer";
import HighLights from "@/components/Highlights";
import HighlightsFallback from "@/components/Suspense/HighlightsFallback";
import LoaderCard from "@/components/loaderCard";
import { Navbar } from "@/components/navbar";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Suspense } from "react";

const Page = () => {
  return (
    <>
      <main className="pb-28 px-7">
        <Navbar />
        <section className="h-[100dvh] grid place-items-center w-full ">
          <div className="relative text-center ">
            <figure
              aria-hidden
              className="absolute rounded-full bg-ckPrimary w-44 aspect-square blur-3xl -top-10 -left-10 aria-disabled -z-10 "
            >
              <figure className="absolute top-0 w-24 rounded-full bg-ckAccent aspect-square " />
            </figure>
            <h1 className="  text-[clamp(2.5rem,10vw,5rem)]  font-cal py-2">
              Community-{" "}
              <span className="italic underline decoration-wavy underline-offset-auto decoration-ckAccent">
                Crafted
              </span>{" "}
              <br /> Component Hub
            </h1>
            <p className="text-[clamp(1rem,5vw,1.5rem)]  font-cal pb-3">
              Your Creative Toolbox for Web Wizards and App Alchemists
            </p>
            <div className="flex items-center justify-center gap-x-4">
              <a
                href="#explore"
                className={cn(
                  buttonVariants({
                    variant: "default",
                    className: "",
                  })
                )}
              >
                Get Started
              </a>
              <Link
                href="/dashboard"
                className={cn(
                  buttonVariants({
                    variant: "outline",
                    className: "",
                  })
                )}
              >
                Dashboard
              </Link>
            </div>
          </div>
        </section>
        <Suspense fallback={<HighlightsFallback />}>
          <HighLights />
        </Suspense>
      </main>
      <Footer />
    </>
  );
};

export default Page;
