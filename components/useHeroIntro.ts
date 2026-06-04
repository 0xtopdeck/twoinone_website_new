"use client";

import { useEffect, useState } from "react";

/**
 * Shared hero load-in timing: an intro overlay plays, then `introDone` flips
 * (crossfade), the headline types out `totalChars` characters, and `doneTyping`
 * flips (reveal subcopy/buttons). Honors prefers-reduced-motion.
 */
export function useHeroIntro(totalChars: number, introDelay = 3500) {
  const [introDone, setIntroDone] = useState(false);
  const [hideField, setHideField] = useState(false);
  const [typed, setTyped] = useState(0);
  const [doneTyping, setDoneTyping] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setIntroDone(true);
      setHideField(true);
      setTyped(9999);
      setDoneTyping(true);
      return;
    }
    const t1 = setTimeout(() => setIntroDone(true), introDelay);
    const t2 = setTimeout(() => setHideField(true), introDelay + 1000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [introDelay]);

  useEffect(() => {
    if (!introDone || doneTyping) return;
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setTyped(i);
      if (i >= totalChars) {
        clearInterval(id);
        setDoneTyping(true);
      }
    }, 55);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [introDone]);

  return { introDone, hideField, typed, doneTyping };
}
