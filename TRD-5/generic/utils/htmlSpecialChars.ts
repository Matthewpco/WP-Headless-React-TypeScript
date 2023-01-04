const charMap: { [key: string]: string } = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;', // ' -> &apos; for XML only
};

const charMapDecode: { [key: string]: string } = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'",
};

const replacer = (value: string) => charMap[value];
const replacerDecode = (value: string) => charMapDecode[value];

export const htmlSpecialChars = (value: string): string =>
  value.replace(/[&<>"']/g, replacer);

export const decodeHtmlSpecialChars = (value: string) =>
  value.replace(/(&amp;|&lt;|&gt;|&quot;|&#39;)/g, replacerDecode);
