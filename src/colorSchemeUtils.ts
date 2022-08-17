export function applyScheme(scheme: 'dark' | 'light'): void {
  document.documentElement.setAttribute('scheme', scheme);
}

export function getSystemScheme(): 'dark' | 'light' {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
