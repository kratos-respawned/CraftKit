import LoaderCard from "../loaderCard";

const HighlightsFallback = () => {
  return (
    <div id="explore" className="">
      <h2 className="text-[clamp(2.5rem,10vw,5rem)]  font-cal py-2 text-center">
        Explore
      </h2>
      <section className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <LoaderCard key={i} />
          ))}
      </section>
    </div>
  );
};

export default HighlightsFallback;
