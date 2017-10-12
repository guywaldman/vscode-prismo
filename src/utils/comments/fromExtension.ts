import { Map, List } from 'immutable'

// default length diff for the most common pattern: // %s
export const DEFAULT_LENGTH_DIFF = 3

/**
 * Resolves difference in length from a string pattern.
 * The string pattern is how the string looks after being commented, where
 * `%s` replaces the string
 * @param {string} commentPattern pattern for the comment (i.e. `// %s`)
 * @return {number} difference in length
 */
const resolveLengthDiffFromCommentPattern: (string) => number = (
  commentPattern: string
) => commentPattern.length - 2

/*
 * Maps comment pattern for commenting styles. Some keys are styles
 * (when used by several languages), while those that are used by only one language,
 * have the key of their respective vscode language identifier (i.e. `tex` for LaTeX)
 */
const COMMENT_PATTERN_BY_LANG: Map<string, string> = Map({
  xml: '<!-- %s -->',
  hash: '# %s',
  bat: 'REM %s',
  percent: '% %s',
  handlebars: '{{!-- %s --}}',
  doubleDash: '-- %s',
  block: '/* %s */',
  pug: '//- %s',
  common: '// %s'
})

// maps popular commenting styles to languages
const PATTERN_TO_LANG: Map<string, List<string>> = Map({
  block: List(['css']),
  hash: List(['shellscript', 'dockerfile', 'ruby', 'coffeescript']),
  xml: List(['xml', 'xsl', 'html', 'markdown']),
  percent: List(['tex', 'prolog']),
  pug: List(['pug', 'jade']),
  doubleDash: List(['lua', 'sql', 'haskell', 'cabal']),
  common: List([
    'javascript',
    'javascriptreact',
    'typescript',
    'java',
    'c',
    'cpp',
    'd'
  ])
})
const COMMENT_PATTERN_BY_LANG_BATCHED: Map<
  string,
  string
> = PATTERN_TO_LANG.reduce((acc, langList, commentPattern) => {
  let result = acc
  langList.forEach(lang => {
    result = result.set(
      lang,
      COMMENT_PATTERN_BY_LANG.get(
        commentPattern,
        COMMENT_PATTERN_BY_LANG.get('common')
      )
    )
  })
  return result
}, Map())

/**
 * TODO: document
 * @param languageId 
 */
export function resolveCommentPattern(languageId: string): string {
  // set the comment pattern according to the languageId
  // first, from the batched map
  return COMMENT_PATTERN_BY_LANG_BATCHED.get(
    languageId,
    // if it fails, then by the regular map
    COMMENT_PATTERN_BY_LANG.get(languageId, null)
  )
}

/**
 * Returns the difference in length between a string, and the string after being
 * commented by vscode using `editor.action.commentLine`
 * For the full list of language identifiers in vscode, see: https://code.visualstudio.com/docs/languages/identifiers.
 * @export
 * @param {string} languageId language id
 * @returns {number} difference in length between commented and uncommented
 */
export default function resolveLengthDiff(languageId: string): Promise<number> {
  const commentPattern = resolveCommentPattern(languageId)

  if (commentPattern !== null) {
    return Promise.resolve(resolveLengthDiffFromCommentPattern(commentPattern))
  }

  return Promise.reject(null)
}
