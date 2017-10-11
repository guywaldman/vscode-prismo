import { TextEditor } from 'vscode'
import { getConfig, Config } from '../utils/config'

const SPACE = 'S'
const TITLE = 'T'

/**
 * Comment paterns for different languages.
 * Also includes sane defaults
 */
const COMMENT_PATTERNS = {
  html: `<!--${SPACE}${TITLE}${SPACE}-->`,
  hash: `#${SPACE}${TITLE}`,
  COMMON_BLOCK: `/*${SPACE}${TITLE}${SPACE}*/`,
  COMMON: `//${SPACE}${TITLE}`
}

const LANGUAGE_TO_COMMENT_PATTERN = {
  css: COMMENT_PATTERNS.COMMON_BLOCK,
  html: COMMENT_PATTERNS.html,
  shellscript: COMMENT_PATTERNS.hash,
  default: COMMENT_PATTERNS.COMMON
}

/**
 * Returns object that maps a vscode languageId to its respective comment pattern.
 * Overrides defined comment patterns with user specified ones (prismo.commentPatterns)
 * @return {object} map between languageId and comment pattern
 */
const getLanguageToCommentPatternMap : () => object = () => {
  const { commentPatterns } = getConfig()
  return Object.assign({}, LANGUAGE_TO_COMMENT_PATTERN, commentPatterns)
}

/**
 * Returns the received languageId's comment pattern, or returns a sensible default
 * if it isn't registered in the result of calling `getLanguageToCommentPatternMap()`
 * @param {string} languageId vscode's languageId for the desired language
 * @return {string} comment pattern for language (specified in docs)
 */
const resolveCommentPattern: (string) => string = (languageId: string = 'default') => {
  const config : object = getLanguageToCommentPatternMap()
  return config[languageId] || LANGUAGE_TO_COMMENT_PATTERN.default
}

/**
 * Returns difference in the string width after commenting the title.
 * Relies on user defined comment patterns for known languages, and the
 * default of `// comment here`
 * i.e. for a language with the comment pattern `// comment here`,
 * and the extension's default, calling the function would return 3,
 * because "// " has a length of 3
 * @export
 * @param {TextEditor} editor the vscode `TextEditor` instance
 * @param {string} [title=''] title to be used
 * @returns {number} difference of length between comment and uncomment
 */
export default function resolveLengthDiff(
  editor: TextEditor,
  title: string = ''
): number {
  if (!editor) return

  const { document: { languageId } } = editor
  const commentPattern: string = resolveCommentPattern(languageId)

  // calculate width that padding requires
  const config: Config = getConfig()
  const { padding, dash } = config

  // replace S and T with actual padding and the title required, respectively
  const spaceRegexp = new RegExp(SPACE, 'g')
  const titleRegexp = new RegExp(TITLE, 'g')
  const interpolatedComment = commentPattern
    .replace(spaceRegexp, () => dash.repeat(padding))
    .replace(titleRegexp, () => title)

  // return difference
  return interpolatedComment.length - title.length
}
