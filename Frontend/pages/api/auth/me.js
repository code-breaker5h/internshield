// Get Current User Info (Serverless)
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
  
  // Get token from Authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verify and decode token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Return user data
    return res.status(200).json({
      success: true,
      data: {
        id: decoded.id,
        email: decoded.email,
        name: decoded.name,
        picture: decoded.picture,
        credits: decoded.credits || 5,
      },
    });
  } catch (error) {
    return res.status(401).json({ success: false, error: 'Invalid token' });
  }
}
