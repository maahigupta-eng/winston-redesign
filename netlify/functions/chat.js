const ALLOWED_MODEL = 'claude-sonnet-4-6';

exports.handler = async (event) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: { message: 'Method not allowed' } })
    };
  }

  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: { message: 'ANTHROPIC_API_KEY is not set on this site.' } })
    };
  }

  let payload;
  try {
    payload = JSON.parse(event.body || '{}');
  } catch (e) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: { message: 'Invalid JSON in request body.' } })
    };
  }

  const messages = Array.isArray(payload.messages) ? payload.messages : [];
  if (!messages.length) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: { message: 'No messages provided.' } })
    };
  }

  // Trim history so long sessions do not blow the context or the token budget
  const trimmed = messages.slice(-20);

  const body = {
    model: ALLOWED_MODEL,
    max_tokens: Math.min(payload.max_tokens || 1800, 4000),
    messages: trimmed
  };
  if (payload.system) body.system = payload.system;

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': key,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(body)
    });

    const text = await res.text();

    if (!res.ok) {
      let message = text;
      try {
        const parsed = JSON.parse(text);
        message = (parsed.error && parsed.error.message) || text;
      } catch (e) {}
      return {
        statusCode: res.status,
        headers,
        body: JSON.stringify({ error: { message: 'Anthropic API error: ' + message } })
      };
    }

    return { statusCode: 200, headers, body: text };
  } catch (err) {
    return {
      statusCode: 502,
      headers,
      body: JSON.stringify({ error: { message: 'Upstream request failed: ' + (err.message || String(err)) } })
    };
  }
};
