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

    // Build the Airtable record - only include fields with values
    const fields = {
      'Submitted At': new Date().toISOString(),
      'Status': 'Todo'
    };

    // Text fields - only add if they have a value
    if (data.first_name) fields['First Name'] = data.first_name;
    if (data.last_name) fields['Last Name'] = data.last_name;
    if (data.email) fields['Email'] = data.email;
    if (data.phone) fields['Phone'] = data.phone;
    if (data.city) fields['City'] = data.city;
    if (data.state_country) fields['State/Country'] = data.state_country;
    if (data.linkedin) fields['LinkedIn'] = data.linkedin;
    if (data.job_title) fields['Job Title'] = data.job_title;
    if (data.company) fields['Company'] = data.company;
    if (data.years_experience) fields['Years Experience'] = data.years_experience;
    if (data.education) fields['Education'] = data.education;
    if (data.summary) fields['Professional Summary'] = data.summary;
    if (data.tools) fields['Tools & Platforms'] = data.tools;
    if (data.referral_source) fields['Referral Source'] = data.referral_source;
    if (data.additional_info) fields['Additional Info'] = data.additional_info;

    // Multi-select fields - only add if array has items
    if (data.expertise && Array.isArray(data.expertise) && data.expertise.length > 0) {
      fields['Expertise Areas'] = data.expertise;
    }
    if (data.industries && Array.isArray(data.industries) && data.industries.length > 0) {
      fields['Industries'] = data.industries;
    }

    // Handle resume file - Uploadcare provides a CDN URL
    if (data.resume_url) {
      fields['Resume'] = [{ 
        url: data.resume_url,
        filename: data.resume_name || 'resume.pdf'
      }];
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
