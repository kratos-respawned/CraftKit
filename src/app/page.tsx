import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/navbar";
import { buttonVariants } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { getServerSession } from "next-auth";
import Link from "next/link";
import Balancer from "react-wrap-balancer";

const Page = () => {
  return (
    <main>
      <Navbar />
      <section className="h-[100dvh] grid place-items-center w-full ">
        <div className="text-center relative ">
          <figure
            aria-hidden
            className="bg-ckPrimary w-44 aspect-square  blur-3xl  -top-10 -left-10   aria-disabled -z-10 absolute  rounded-full "
          >
            <figure className="bg-ckAccent w-24 aspect-square   rounded-full absolute top-0 " />
          </figure>
          <h1 className=" leading-tight text-[clamp(2.5rem,10vw,5rem)]  font-cal py-2">
            Community-{" "}
            <span className="italic underline  decoration-wavy underline-offset-auto decoration-ckAccent">
              Crafted
            </span>{" "}
            <br /> Component Hub
          </h1>
          <p className="text-[clamp(1rem,5vw,1.5rem)]  font-cal pb-3">
            Your Creative Toolbox for Web Wizards and App Alchemists
          </p>
          <div className="flex justify-center items-center gap-x-4">
            <Link
              //   href={session?.user ? "/dashboard/files" : "/login"}
              href={"/explore"}
              className={cn(
                buttonVariants({
                  variant: "default",
                  className: "",
                })
              )}
            >
              Get Started
            </Link>
            <Link
              href={
                "https://github.com/kratos-respawned/younicorn_uploadify#uploadify"
              }
              target="_blank"
              referrerPolicy="no-referrer"
              className={cn(
                buttonVariants({
                  variant: "outline",
                  className: "",
                })
              )}
            >
              Docs
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Page;
