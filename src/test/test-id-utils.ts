/**
 * Transforms a string into a valid test ID by converting to lowercase
 * and replacing non-alphanumeric characters with hyphens.
 *
 * @param text - The text to transform
 * @returns A valid test ID string
 *
 * @example
 * generateTestId("Frontend & Styling") // "frontend---styling"
 * generateTestId("Node.js") // "node-js"
 * generateTestId("C#") // "c-"
 * generateTestId("REST APIs") // "rest-apis"
 */
export function generateTestId(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]/g, '-');
}

/**
 * Generates a prefixed test ID for components
 *
 * @param prefix - The prefix for the test ID
 * @param text - The text to transform
 * @returns A prefixed test ID string
 *
 * @example
 * generatePrefixedTestId("skill-chip", "Node.js") // "skill-chip-node-js"
 * generatePrefixedTestId("category-title", "Frontend & Styling") // "category-title-frontend---styling"
 */
export function generatePrefixedTestId(prefix: string, text: string): string {
  return `${prefix}-${generateTestId(text)}`;
}