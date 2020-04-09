export default function BuildConditionalClasses(condition: boolean, className: string): string {
  return condition ? className : '';
}
