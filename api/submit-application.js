// Vercel Serverless Function to submit consultant applications to Airtable
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = 'appVwxlTQadoN2VBP';
const AIRTABLE_TABLE_NAME = 'Consultant Applications';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const data = req.body;

    // Build the Airtable record
    const fields = {
      'First Name': data.first_name || '',
      'Last Name': data.last_name || '',
      'Email': data.email || '',
      'Phone': data.phone || '',
      'City': data.city || '',
      'State/Country': data.state_country || '',
      'LinkedIn': data.linkedin || '',
      'Job Title': data.job_title || '',
      'Company': data.company || '',
      'Years Experience': data.years_experience || '',
      'Education': data.education || '',
      'Professional Summary': data.summary || '',
      'Expertise Areas': data.expertise || [],
      'Tools & Platforms': data.tools || '',
      'Industries': data.industries || [],
      'Referral Source': data.referral_source || '',
      'Additional Info': data.additional_info || '',
      'Submitted At': new Date().toISOString(),
      'Status': 'New'
    };

    // Handle resume file if provided (base64 encoded)
    if (data.resume_url) {
      fields['Resume'] = [{ url: data.resume_url }];
    }

    // Submit to Airtable
    const response = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ fields })
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Airtable error:', errorData);
      return res.status(response.status).json({ 
        error: 'Failed to submit application', 
        details: errorData 
      });
    }

    const result = await response.json();
    
    return res.status(200).json({ 
      success: true, 
      message: 'Application submitted successfully',
      recordId: result.id 
    });

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ 
      error: 'Internal server error', 
      message: error.message 
    });
  }
}
