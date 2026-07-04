import clsx from "clsx";

/**
 * The Two in One brand emblem. Single transparent PNG of the metallic
 * "2in1" mark; reads cleanly on both dark and light themes.
 */
export default function EmblemMark({ size }: { size: string }) {
  return (
    <span className={clsx("relative block shrink-0", size)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/twoinone-logo.png"
        alt="Two in One LLC"
        className="absolute inset-0 block h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
      />
    </span>
  );
}
