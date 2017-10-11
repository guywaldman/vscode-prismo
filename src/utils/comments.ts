import { TextEditor } from 'vscode'
import { getConfig, Config } from '../utils/config'

const SPACE = '${S}'
const TITLE = '${T}'

/**
 * Comment paterns for different languages.
 * Also includes sane defaults
 */
let COMMENT_PATTERNS = {
  xml: `<!--${SPACE}${TITLE}${SPACE}-->`,
  hash: `#${SPACE}${TITLE}`,
  bat: `REM${SPACE}${TITLE}`,
  tex: `${SPACE}${TITLE}`,
  handlebars: `{{!--${TITLE}--}}`,
  COMMON_BLOCK: `/*${SPACE}${TITLE}${SPACE}*/`,
  COMMON: `//${SPACE}${TITLE}`
}

const LANGUAGE_TO_COMMENT_PATTERN = {
  css: COMMENT_PATTERNS.COMMON_BLOCK,
  xml: COMMENT_PATTERNS.xml,
  html: COMMENT_PATTERNS.xml,
  bat: COMMENT_PATTERNS.bat,
  tex: COMMENT_PATTERNS.tex,
  ruby: COMMENT_PATTERNS.hash,
  handlebars: COMMENT_PATTERNS.handlebars,
  shellscript: COMMENT_PATTERNS.hash,
  default: COMMENT_PATTERNS.COMMON
}

// TODO: document
const getLanguageToCommentPatternMap = () => {
  const { commentPatterns } = getConfig()
  return Object.assign({}, LANGUAGE_TO_COMMENT_PATTERN, commentPatterns)
}

// TODO: document
const resolveCommentPattern: (string) => string = (languageId: string) =>
  getLanguageToCommentPatternMap()[languageId] ||
  LANGUAGE_TO_COMMENT_PATTERN.default

// TODO: document
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
