const {Configuration, PlaidApi, PlaidEnvironments} = require('plaid'); 

// NOTE: CHANGE LATER ---> need more secure way 
const Plaid_ENV = 'sandbox';
const Plaid_CLIENT_ID = "67a2c1c7dfedf6001d6fc634";
const Plaid_SECRET = "9f212457f545843fae9aa75ecb28c7";

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// create new config and client
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

const app = express();
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);
app.use(bodyParser.json());
app.use(cors());

// 1. create a new link_token by making a /link/token/create request and passing in the required configurations. 
// This link_token is a short lived, one-time use token that authenticates your app with Plaid Link, our frontend module.

app.post('/api/create_link_token', async function (request, response) {
    // Get the client_user_id by searching for the current user
    // const user = await User.find(...);
    // const clientUserId = user.id;
    const linkTokenRequest = {
      user: {
        // This should correspond to a unique id for the current user.
        client_user_id: "test-client-user-id", // clientUserId
      },
      client_name: 'Plaid Test App',
      products: ['auth'],
      language: 'en',
      webhook: 'https://webhook.example.com',
      redirect_uri: 'https://domainname.com/oauth-page.html',
      country_codes: ['US'],
    };
    try {
      const createTokenResponse = await client.linkTokenCreate(linkTokenRequest);
      response.json(createTokenResponse.data);
    } catch (error) {
      // handle error
      console.error('Error creating link token:', error.response?.data || error.message);
      request.status(500).json({ error: 'Failed to create link token' });
    }
  });

// 2. Use link-token to initialize a Link (drop-in client-side module that handels authenication)
        // what users use to log into finanical institution accounts
// 3. Link provides us w/ public-token via onSuccess callback 
        // need to pass public-token from client side code to the server
        // NOTE: because we are using sandbox ---> /sandbox/public_token/create
const publicTokenRequest: SandboxPublicTokenCreateRequest = {
    institution_id: institutionID,
    initial_products: initialProducts,
};
try {
const publicTokenResponse = await client.sandboxPublicTokenCreate(
    publicTokenRequest,
);
const publicToken = publicTokenResponse.data.public_token;
// The generated public_token can now be exchanged
// for an access_token
const exchangeRequest: ItemPublicTokenExchangeRequest = {
    public_token: publicToken,
};
const exchangeTokenResponse = await client.itemPublicTokenExchange(
    exchangeRequest,
);
const accessToken = exchangeTokenResponse.data.access_token;
} catch (error) {
// handle error
}
        
// 4. Server side calls /item/public-token/exchange to get an access-token from the public-token returned by Link
    // access-token uniquely identifies an item --- need for API calls

// 5. /accounts/get retreives basic information about the accounts associated w/ an item

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
