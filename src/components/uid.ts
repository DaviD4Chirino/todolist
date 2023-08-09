"use client";
/**
 * Generates a unique identifier.
 *
 * @return {number} A random number based on the current timestamp.
 */
export default function uid(): number {
  return Math.floor(Math.random() * Date.now());
}
