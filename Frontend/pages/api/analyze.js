// Vercel Serverless API - redirects to analyze-internship
// This maintains backward compatibility with existing frontend code

export default async function handler(req, res) {
  // Import and use the main analysis function
  const analyzeInternship = (await import('./analyze-internship')).default;
  return analyzeInternship(req, res);
}
