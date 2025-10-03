export default function collapseBlankLines(input: string): string {
  return input.replace(/(\r?\n){2,}/g, "\n");
}
