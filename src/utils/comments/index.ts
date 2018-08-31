import patternFromPresets from './patternFromPresets';

/**
 * Resolves difference in length from a string pattern.
 * The string pattern is how the string looks after being commented, where
 * `%s` replaces the string
 * @param {string} commentPattern pattern for the comment (i.e. `// %s`)
 * @return {number} difference in length
 */
const lengthDiffFromCommentPattern: (string) => number = (
  commentPattern: string
) => commentPattern.length - 2;

function commentPatternFromLanguage(languageId: string) : Promise<string> {
  // TODO: handle non-existant
  const tryPatternFromPresets = patternFromPresets(languageId);
  if (tryPatternFromPresets) {
    return Promise.resolve(tryPatternFromPresets);
  }
  // TODO: handle user prompt to add comment pattern
  return Promise.resolve("// %s");
}


export { lengthDiffFromCommentPattern, commentPatternFromLanguage  };
