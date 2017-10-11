import { Map, List } from 'immutable'

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
  tex: '% %s',
  handlebars: '{{!-- %s --}}',
  doubleDash: '-- %s',
  block: '/* %s */',
  common: '// %s'
})

// maps popular commenting styles to languages
const PATTERN_TO_LANG: Map<string, List<string>> = Map({
  block: List(['css']),
  hash: List(['shellscript', 'dockerfile', 'ruby', 'coffeescript']),
  xml: List(['xml', 'xsl', 'html', 'markdown']),
  doubleDash: List(['lua', 'sql'])
})
const COMMENT_PATTERN_BY_LANG_BATCHED: Map<
  string,
  string
> = PATTERN_TO_LANG.reduce((acc, langList, commentPattern) => {
  let result = acc
  langList.forEach(lang => {
    result = result.set(lang, commentPattern)
  })
  return result
}, Map())

/**
 * Returns the difference in length between a string, and the string after being
 * commented by vscode using `editor.action.commentLine`
 * For the full list of language identifiers in vscode, see: https://code.visualstudio.com/docs/languages/identifiers.
 * @export
 * @param {string} languageId language id
 * @returns {number} difference in length between commented and uncommented
 */
export default function resolveLengthDiff(languageId: string): number {
  // set the comment pattern according to the languageId
  // first, from the batched map
  let commentPattern: string = COMMENT_PATTERN_BY_LANG_BATCHED.get(
    languageId,
    null
  )
  if (!commentPattern)
    // if it fails, then by the regular map
    commentPattern = COMMENT_PATTERN_BY_LANG.get(
      languageId,
      COMMENT_PATTERN_BY_LANG.get('common')
    )

  return resolveLengthDiffFromCommentPattern(commentPattern)
}
