// TODO: add all languages from https://code.visualstudio.com/docs/languages/identifiers

const BY_LANGUAGE = {};

const BY_PATTERN = {
  hash: ["cs"]
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
  return patterns[languageId];
}

export default patternFromPresets;
