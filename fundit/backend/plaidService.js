const {Configuration, PlaidApi, PlaidEnvironments} = require('plaid'); 

// TO-DO
const Plaid_ENV = 'sandbox';
const Plaid_CLIENT_ID = "67a2c1c7dfedf6001d6fc634";
const Plaid_SECRET = "9f212457f545843fae9aa75ecb28c7";

// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');

const http = require('http');
const url = require('url');
const util = require('util');

// Create new PLAID config and client
const configuration = new Configuration({
    basePath: PlaidEnvironments[Plaid_ENV],
    baseOptions: {
      headers: {
        'PLAID-CLIENT-ID': Plaid_CLIENT_ID,
        'PLAID-SECRET': Plaid_SECRET
      },
    },
  });
const client = new PlaidApi(configuration);

// HTTP SERVER LISTENER
const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const method = req.method;
  const pathname = parsedUrl.pathname;

  // CORS support
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (method === 'OPTIONS') {
    res.writeHead(204);
    return res.end();
  }

  // CREATE_LINK_TOKEN
  if (method == "POST" && pathname == "/api/create_link_token") {
    // Build request body
    let body = "";
    req.on('data', chunk => body += chunk);

    // Body finished processing
    req.on('end', async () => {
      try {
        // Create the link token
        const tokenRequest = {
          user: {
            client_user_id: 'test-client-user-id', // Replace this in production
          },
          client_name: 'Plaid Test App',
          products: ['auth', 'transactions'],
          language: 'en',
          redirect_uri: 'https://domainname.com/oauth-page.html',
          country_codes: ['US'],
        };

        // Pass the tokenRequest to linkTokenCreate() of PlaidAPI
        const tokenResponse = await client.linkTokenCreate(tokenRequest);

        // Successful callback, return Link Token to client
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(tokenResponse.data));
      } catch {
        // Failure to create the Link Token, not passed to client
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Failed to create link token' }));
      }
    });
    return;
  }

  // EXCHANGE_PUBLIC_TOKEN
  if (method == "POST" && pathname == "api/exchange_public_token") {
    // Build request body
    let body = "";
    req.on('data', chunk => body += chunk);

    // Body finished processing
    req.on('end', async () => {
      try {
        // Parse the body, obtain the public token
        const parsed = JSON.parse(body);
        const publicToken = parsed.public_token;
  
        // Exchange the short-lived public token for an access token and item id
        const exchangeResponse = await client.itemPublicTokenExchange({
          public_token: publicToken,
        });

        // TO-DO: write these to firestore
        const accessToken = exchangeResponse.data.access_token;
        const itemID = exchangeResponse.data.item_id;
  
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ public_token_exchange: 'complete' }));
      } catch {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Failed to exchange public token' }));
      }
    });
    return;
  }

  /*
  // ACCOUNTS TO-DO
  app.get('/api/accounts', async function geti (request, response, next) {
    try {
      const accountsResponse = await client.accountsGet({
        access_token: accessToken,
      });
      prettyPrintResponse(accountsResponse);
      response.json(accountsResponse.data);
    } catch (error) {
      prettyPrintResponse(error);
      return response.json(formatError(error.response));
    }
  });

  // TRANSACTIONS TO-DO
  app.get('/api/transactions', (request, response, next) => {
    Promise.resolve()
      .then(async () => {
        // Set cursor to empty to receive all historical updates
        let cursor = null;

        // New transaction updates since "cursor"
        let added = [];
        let modified = [];
        // Removed transaction ids
        let removed = [];
        let hasMore = true;
        // Iterate through each page of new transaction updates for item
        while (hasMore) {
          const request = {
            access_token: ACCESS_TOKEN,
            cursor: cursor,
          };
          const response = await client.transactionsSync(request) // TO-DO
          const data = response.data;

          // If no transactions are available yet, wait and poll the endpoint.
          // Normally, we would listen for a webhook, but the Quickstart doesn't
          // support webhooks. For a webhook example, see
          // https://github.com/plaid/tutorial-resources or
          // https://github.com/plaid/pattern
          cursor = data.next_cursor;
          if (cursor === "") {
            await sleep(2000);
            continue;
          }

          // Add this page of results
          added = added.concat(data.added);
          modified = modified.concat(data.modified);
          removed = removed.concat(data.removed);
          hasMore = data.has_more;

          prettyPrintResponse(response);
        }

        const compareTxnsByDateAscending = (a, b) => (a.date > b.date) - (a.date < b.date);
        // Return the 8 most recent transactions
        const recently_added = [...added].sort(compareTxnsByDateAscending).slice(-8);
        response.json({ latest_transactions: recently_added });
      })
      .catch(next);
  });

  // TO-DO
  app.get('/api/investments_transactions', (request, response, next) => {
    Promise.resolve()
      .then(async () => {
        const startDate = moment().subtract(30, 'days').format('YYYY-MM-DD');
        const endDate = moment().format('YYYY-MM-DD');
        const configs = {
          access_token: ACCESS_TOKEN,
          start_date: startDate,
          end_date: endDate,
        };
        const investmentTransactionsResponse =
          await client.investmentsTransactionsGet(configs); // TO-DO
        prettyPrintResponse(investmentTransactionsResponse);
        response.json({
          error: null,
          investments_transactions: investmentTransactionsResponse.data,
        });
      })
      .catch(next);
  });
  */
});

// const app = express();
// app.use(
//   bodyParser.urlencoded({
//     extended: false,
//   }),
// );
// app.use(bodyParser.json());
// app.use(cors());

// 1. create a new link_token by making a /link/token/create request and passing in the required configurations. 
// This link_token is a short lived, one-time use token that authenticates your app with Plaid Link, our frontend module.



// app.post('/api/create_link_token', async function (request, response) {
//     // Get the client_user_id by searching for the current user
//     const user = auth.currentUser;
//     const clientUserId = user.id;
//     request = {
//       user: {
//         // This should correspond to a unique id for the current user.
//         client_user_id: "test-client-user-id", // clientUserId
//       },
//       client_name: 'Plaid Test App',
//       products: ['auth', 'transactions'],
//       language: 'en',
//       webhook: 'https://webhook.example.com',
//       redirect_uri: 'https://domainname.com/oauth-page.html',
//       country_codes: ['US'],
//     };
//     try {
//       const createTokenResponse = await client.linkTokenCreate(request);
//       response.json(createTokenResponse.data);
//     } catch (error) {
//       // handle error
//     }
//   });

// // 2. Use link-token to initialize a Link (drop-in client-side module that handels authenication)
//         // what users use to log into finanical institution accounts
// // 3. Link provides us w/ public-token via onSuccess callback 
//         // need to pass public-token from client side code to the server
//         // NOTE: because we are using sandbox ---> /sandbox/public_token/create
// const publicTokenRequest: SandboxPublicTokenCreateRequest = {
//     institution_id: institutionID,
//     initial_products: initialProducts,
// };
// try {
// const publicTokenResponse = await client.sandboxPublicTokenCreate(
//     publicTokenRequest,
// );
// const publicToken = publicTokenResponse.data.public_token;
// // The generated public_token can now be exchanged
// // for an access_token
// const exchangeRequest: ItemPublicTokenExchangeRequest = {
//     public_token: publicToken,
// };
// const exchangeTokenResponse = await client.itemPublicTokenExchange(
//     exchangeRequest,
// );
// const accessToken = exchangeTokenResponse.data.access_token;
// } catch (error) {
// // handle error
// }
        
// 4. Server side calls /item/public-token/exchange to get an access-token from the public-token returned by Link
    // access-token uniquely identifies an item --- need for API calls

// 5. /accounts/get retreives basic information about the accounts associated w/ an item



  // SYNC_AVAILABLE_UPDATES WEBHOOK FOR UPDATES
  // Or just use call transactionsSync when needed

  const prettyPrintResponse = (response) => {
    console.log(util.inspect(response.data, { colors: true, depth: 4 }));
  };