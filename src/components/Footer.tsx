import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="absolute inset-x-0 bottom-0 py-5 text-sm text-center">
      <p className="relative cursor-pointer group">
        Made with <span className="peer">💜</span>
        <Image
          className="  block w-[100px] h-[100px] cursor-auto grayscale peer-hover:grayscale-0   transition-all duration-500 peer-hover:opacity-100 peer-hover:pointer-events-auto pointer-events-none opacity-0 absolute top-0 -translate-y-full left-1/2 -translate-x-1/2"
          src="/computer.gif"
          alt="love"
          width={200}
          height={200}
        />{" "}
      </p>
      by
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.youtube.com/shorts/8x6sf0g061E"
        className="relative inline-block ml-1 transition-colors group hover:text-primary"
      >
        Team TSX
      </a>
    </footer>
  );
};
