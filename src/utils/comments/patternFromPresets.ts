
import patterns from "./commentPatterns";

// TODO: doc
function patternFromPresets(languageId: string) : string | undefined {
  return patterns[languageId];
}

export default patternFromPresets;
