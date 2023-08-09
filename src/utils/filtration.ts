/**
 * Flters an array of strings based on a search string.
 *
 * @param {string[]} arr - The array of strings to filter.
 * @param {string} search - The string to search for.
 * @return {string[]} - The filtered array of strings.
 */
export function filterArrayString(arr: string[], search: string): string[] {
  return arr.filter((el) => el.toLowerCase().includes(search.toLowerCase()));
}
