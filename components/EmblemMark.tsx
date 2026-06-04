import clsx from "clsx";

/**
 * The Two in One emblem. Two pre-colored variants are swapped by theme so the
 * deep brand teal stays legible on near-black (dark) while keeping the original
 * deep teal on light. Place inside a `group` to get the hover scale.
 */
export default function EmblemMark({ size }: { size: string }) {
  return (
    <span className={clsx("relative block shrink-0", size)}>
      <img
        src="/images/twoinone-emblem-dark.svg"
        alt="Two in One"
        className="absolute inset-0 hidden h-full w-full object-contain transition-transform duration-500 group-hover:scale-105 dark:block"
      />
      <img
        src="/images/twoinone-emblem-light.svg"
        alt="Two in One"
        className="absolute inset-0 block h-full w-full object-contain transition-transform duration-500 group-hover:scale-105 dark:hidden"
      />
    </span>
  );
}
