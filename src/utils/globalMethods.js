export function inferContentTypeFromUrl(url) {
  const patterns = [
    {regex: /\.jpg($|\?)/i, type: '.jpg'},
    {regex: /\.jpeg($|\?)/i, type: '.jpeg'},
    {regex: /\.png($|\?)/i, type: '.png'},
    {regex: /\.mp4($|\?)/i, type: '.mp4'},
    // Add other patterns as needed
  ];

  for (const pattern of patterns) {
    if (pattern.regex.test(url)) {
      return pattern.type;
    }
  }

  return 'unknown'; // Default fallback
}
