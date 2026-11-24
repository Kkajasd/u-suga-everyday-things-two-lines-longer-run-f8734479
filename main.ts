// Everyday Things, Two Lines, Longer Run —
// u-suga-everyday-things-two-lines-longer-run-f8734479.
//
// The entry is exactly two lines about a toaster. Line 1 explains the
// toaster to a 10-year-old in one vivid sentence built on a single
// analogy: a little elevator that carries a slice of bread down into a
// dark box of glowing hot wires and pops it back up golden. Line 2 is
// honest about the analogy: it says what the elevator picture maps (the
// down-wait-pop trip) and what it leaves out (nothing inside moves the
// bread — the wires just sit there glowing hot, and a timer decides
// when to let go).
//
// The program is deterministic: same two lines on every run, no
// network, no input files, no randomness. It only creates /output when
// missing and writes entry.txt in place — it never removes /output.

import { existsSync, mkdirSync, writeFileSync } from "node:fs";

const ENTRY =
  "A toaster is a little elevator for bread: it carries your slice down into a dark box full of glowing hot wires that toast it golden, then pops it back up when it is done.\n" +
  "The elevator gets the trip right — down, wait, pop back up — but it leaves out that nothing inside moves the bread: still wires just glow hot, and a timer decides when to let go.";

function main(): void {
  // Mirror the sealed gate (1-400 characters, two lines, not blank) so a
  // bad entry fails here, loudly, instead of scoring 0 in the sandbox.
  const length = Array.from(ENTRY).length;
  if (length < 1 || length > 400) {
    throw new Error(`entry is ${length} characters, outside the 1-400 gate`);
  }
  const lines = ENTRY.split("\n");
  if (lines.length !== 2 || lines.some((line) => line.trim().length === 0)) {
    throw new Error("entry must be exactly two non-blank lines");
  }

  if (!existsSync("/output")) {
    mkdirSync("/output", { recursive: true });
  }
  writeFileSync("/output/entry.txt", ENTRY, "utf8");
}

main();
