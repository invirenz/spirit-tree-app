export default async function handler(req, res) {
  // 1. Only allow "POST" requests (Security)
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // 2. Get your secret key from Vercel's Environment Variables
  const API_KEY = process.env.DH_API_KEY; 
  
  // 3. Digital Humani Project ID (81072222 = Madagascar reforestation)
  const PROJECT_ID = "81072222"; 

  try {
    const response = await fetch('https://api.digitalhumani.com/tree', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': API_KEY
      },
      body: JSON.stringify({
        "treeCount": 1,
        "enterpriseId": "Invirenz-Spirit-Tree", 
        "projectId": PROJECT_ID,
        "user": "fan@spirittree.app" 
      })
    });

    const data = await response.json();
    
    // Send the success message back to your website
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}
