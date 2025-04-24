require('dotenv').config();
const http = require('http');
const { parse } = require('url');
const { Configuration, PlaidApi, PlaidEnvironments } = require('plaid');

// Session workaround using a simple in-memory store --- just until we connect to firebase
const sessions = {};

// Set up Plaid client
const config = new Configuration({
  basePath: PlaidEnvironments[process.env.PLAID_ENV],
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
      'PLAID-SECRET': process.env.PLAID_SECRET,
      'Plaid-Version': '2020-09-14',
    },
  },
});
const client = new PlaidApi(config);
console.log('Client ID:', process.env["PLAID_CLIENT_ID"]);
console.log('Secret:', process.env["PLAID_SECRET"]);


// Helper to read POST body
function getRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => (body += chunk));
    req.on('end', () => resolve(JSON.parse(body || '{}')));
    req.on('error', reject);
  });
}

// Server logic
const server = http.createServer(async (req, res) => {
  const parsedUrl = parse(req.url, true);
  const { pathname } = parsedUrl;
  const method = req.method;

  // This is just temporary -- will want to use data from firebase here 
  const sessionId = req.headers['x-session-id'] || req.socket.remoteAddress + '-' + Date.now();
  if (!sessions[sessionId]) sessions[sessionId] = {};

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*'); // for dev
  res.setHeader('Access-Control-Allow-Headers', '*');

  if (method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }
  
// 1. create a new link_token by making a /link/token/create request and passing in the required configurations. 
// This link_token is a short lived, one-time use token that authenticates your app with Plaid Link, our frontend module.

// 2. Use link-token to initialize a Link (drop-in client-side module that handels authenication)
        // what users use to log into finanical institution accounts
// 3. Link provides us w/ public-token via onSuccess callback 
        // need to pass public-token from client side code to the server
      
// 4. Server side calls /item/public-token/exchange to get an access-token from the public-token returned by Link
    // access-token uniquely identifies an item --- need for API calls

// 5. /accounts/get retreives basic information about the accounts associated w/ an item

  
  if (pathname === '/api/create_link_token' && method === 'POST') {  // Create link token
    const body = await getRequestBody(req);
    const address = body.address;

    const payload = {
      user: { client_user_id: sessionId },
      client_name: 'Plaid Tiny Quickstart - React Native',
      language: 'en',
      products: ['auth'],
      country_codes: ['US']
      //...(address === 'localhost'
      //  ? { redirect_uri: process.env.PLAID_SANDBOX_REDIRECT_URI }
      //  : { android_package_name: process.env.PLAID_ANDROID_PACKAGE_NAME }),
    };

    try {
      const tokenResponse = await client.linkTokenCreate(payload);
      res.end(JSON.stringify(tokenResponse.data));
    } catch (err) {
      console.error(err);
      res.writeHead(500);
      res.end(JSON.stringify({ error: err.message }));
    }
  } else if (pathname === '/api/exchange_public_token' && method === 'POST') {  // Exchange public token
    const body = await getRequestBody(req);

    try {
      const exchangeResponse = await client.itemPublicTokenExchange({
        public_token: body.public_token,
      });

      sessions[sessionId].access_token = exchangeResponse.data.access_token;
      res.end(JSON.stringify({ success: true }));
    } catch (err) {
      console.error(err);
      res.writeHead(500);
      res.end(JSON.stringify({ error: err.message }));
    }
  } else if (pathname === '/api/balance' && method === 'POST') {  // Get balances
    const access_token = sessions[sessionId].access_token;

    if (!access_token) {
      res.writeHead(401);
      res.end(JSON.stringify({ error: 'Not authorized' }));
      return;
    }

    try {
      const balanceResponse = await client.accountsBalanceGet({ access_token });
      res.end(JSON.stringify({ Balance: balanceResponse.data }));
    } catch (err) {
      console.error(err);
      res.writeHead(500);
      res.end(JSON.stringify({ error: err.message }));
    }

  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Route not found' }));
  }
});

// Start the server
const port = 8080;
server.listen(port, () => {
  console.log(`Backend server listening on port ${port}...`);
});
