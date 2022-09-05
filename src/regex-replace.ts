try {
  if (!Deno.args.length) {
    throw `
    Missing args.
    
    Usage:
    ❯ deno run src/regex-replace.ts '/one/obsolete/two' '^/one/obsolete/(.*)$' '/one/${1}'
    `;
  }
  const [src, match, replacement] = Deno.args;
  console.log(regex_replace({ src, match, replacement }));
} catch (error) {
  console.error(error);
  Deno.exit(1);
}

interface RegexReplace {
  src: string;
  match: string;
  replacement: string;
}

/**
 * regex_replace: function to test a RE2 regex in JavaScript
 *
 * ! Extremely simplistic implementation, use for quick sanity checks
 * @param src initial string to operate on
 * @param match RE2 regex to match on
 * @param replacement string to replace src (can include regex groups)
 */
function regex_replace({ src, match, replacement }: RegexReplace): string {
  const regex = new RegExp(match); // convert string to regex
  const replace = replacement.replace(/\{|\}/g, ""); // strip RE2 replacement chars {}
  return src.replace(regex, replace);
}
