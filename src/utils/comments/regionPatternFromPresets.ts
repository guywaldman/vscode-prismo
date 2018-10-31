// TODO: add all languages from https://code.visualstudio.com/docs/languages/identifiers

import commentPatterns from "./commentPatterns";

const BY_LANGUAGE = {
  hash: "#%s"
};

const BY_PATTERN = {
  hash: ["csharp"]
};

function computePatternByLanguage(): { [s: string]: string } {
  let result: { [s: string]: string } = {};
  for (let [pattern, languages] of Object.entries(BY_PATTERN)) {
    languages.forEach(language => {
      result[language] = BY_LANGUAGE[pattern];
    });
  }
  return result;
}

const patterns = computePatternByLanguage();

// TODO: doc
function patternFromPresets(languageId: string): string | undefined {
  return patterns[languageId] || commentPatterns[languageId];
}

export default patternFromPresets;
