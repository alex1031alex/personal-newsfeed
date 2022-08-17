export function applyScheme(scheme: 'dark' | 'light'): void {
  document.documentElement.setAttribute('scheme', scheme);
}
