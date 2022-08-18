const LS_COLOR_SHEME_KEY = 'newsfeed:scheme';

export function applyScheme(scheme: 'dark' | 'light', persist = false): void {
  document.documentElement.setAttribute('scheme', scheme);

  //Если параметр persist существует, то записываем данные в localStorage
  persist && localStorage.setItem(LS_COLOR_SHEME_KEY, scheme);
}

export function getSystemScheme(): 'dark' | 'light' {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function getSavedScheme(): 'dark' | 'light' | null {
  return localStorage.getItem(LS_COLOR_SHEME_KEY) as 'dark' | 'light' | null;
}

export function removeSavedScheme(): void {
  localStorage.removeItem(LS_COLOR_SHEME_KEY);
}
