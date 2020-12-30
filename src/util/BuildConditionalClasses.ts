export default function buildConditionalClasses(
  condition: boolean,
  className: string
): string {
  return condition ? className : "";
}
