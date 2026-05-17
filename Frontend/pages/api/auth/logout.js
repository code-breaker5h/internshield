// Logout Endpoint (Serverless)
export default async function handler(req, res) {
  // For JWT-based auth, logout is handled client-side
  // Just return success
  return res.status(200).json({ success: true, message: 'Logged out successfully' });
}
