/*
 * Links between docs pages open in the top window, so the target tab or section is passed
 * through sessionStorage and read once when the page opens.
 */
export const TAB_REQUEST_KEY = 'odoc-requested-tab';
export const SECTION_REQUEST_KEY = 'odoc-requested-section';

/** Reads and clears a request. */
export const takeRequest = (key: string): string | null => {
  try {
    const value = sessionStorage.getItem(key);
    sessionStorage.removeItem(key);
    return value;
  } catch {
    return null;
  }
};

/** Stores a request for the next page. */
export const request = (key: string, value: string): void => {
  try {
    sessionStorage.setItem(key, value);
  } catch {
    // Storage unavailable: the page opens at its default position.
  }
};
