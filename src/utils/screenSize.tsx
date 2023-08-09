"use client";
import { useState, useEffect } from "react";

/**
 * Returns the current screen size of the window.
 *
 * @return {{ x: number, y: number }} Object with the screen dimensions in pixels.
 */

export default function screenSize(): { x: number; y: number } {
  const [dimension, setDimension] = useState({
    x: typeof window !== "undefined" ? window.innerWidth : 0,
    y: typeof window !== "undefined" ? window.innerHeight : 0,
  });
  const detectSize = () => {
    setDimension({
      x: typeof window !== "undefined" ? window.innerWidth : 0,
      y: typeof window !== "undefined" ? window.innerHeight : 0,
    });
  };
  useEffect(() => {
    window.addEventListener("resize", detectSize);
    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, [dimension]);
  return dimension;
}
