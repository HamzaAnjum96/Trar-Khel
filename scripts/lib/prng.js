// prng.js — small, dependency-free seeded PRNG so that the same spec + seed
// always produces the same placement/jitter (determinism is a core requirement).
//
// mulberry32: fast, good-enough 32-bit generator. Not cryptographic.

export function makePrng(seed) {
  let a = (seed >>> 0) || 1;
  const rand = () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  return {
    /** float in [0,1) */
    next: rand,
    /** float in [min,max) */
    between: (min, max) => min + rand() * (max - min),
    /** integer in [min,max] inclusive */
    int: (min, max) => Math.floor(min + rand() * (max - min + 1)),
    /** pick one element of an array */
    pick: (arr) => arr[Math.floor(rand() * arr.length)],
  };
}
