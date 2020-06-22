// Generate a random suffix for a given input name to prevent auto-fill
export default function randomizeInputName(inputName: string): string {
  const randStr = Math.random().toString(36).slice(2);
  return `${inputName}-${randStr}`;
}
