export default async function handler(req, res) {
  // 1. Security: Only allow "POST" requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // 2. Fetch Secrets from Vercel Environment Variables
  const API_KEY = process.env.DH_API_KEY; 
  // IMPORTANT: Ensure you have added "DH_ENTERPRISE_ID" to Vercel too
  const ENTERPRISE_ID = process.env.DH_ENTERPRISE_ID || "Invirenz-Spirit-Tree";

  // 3. Project ID (44116666 = One Tree Planted - Global Reforestation)
  const PROJECT_ID = "44116666";

  try {
    // 4. Send Request to Digital Humani
    const response = await fetch('https://api.digitalhumani.com/tree', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': 8oMK0NrQHLy627M1OG59xE04x2Wc7Lht6LIZdv6PcER0KJBO
      },
      body: JSON.stringify({
        "treeCount": 1,
        "enterpriseId": 7aaad902, 
        "projectId": 44116666,
        "user": "fan@spirittree.app" 
      })
    });

    // Check if the Digital Humani API actually accepted the request
    if (!response.ok) {
      const errorData = await response.text();
      console.error("Digital Humani API Error:", errorData);
      return res.status(response.status).json({ success: false, message: "Digital Humani error" });
    }

    const data = await response.json();
    
    // 5. Success response to your website
    return res.status(200).json({ success: true, treeId: data.uuid });

  } catch (error) {
    console.error("Serverless Function Error:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
