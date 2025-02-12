import { restClient } from '@polygon.io/client-js';
//node --env-file=../.env polygonIO.mjs

// Setup API Keys, setup default calls to be daily data displayed in bars that spans over
// a year ago from today
const rest = restClient(process.env.POLY_API_KEY);
const now = new Date();
const yearAgo = new Date();
now.setDate(now.getDate() - 1);
yearAgo.setFullYear(yearAgo.getFullYear() - 1);
const defPara = {
	multiplier: 1,
	timePerBar: "day",
	whenFrom: yearAgo.toISOString().split("T")[0],
	whenTo: now.toISOString().split("T")[0]
};

// Manual Testing
if (false) {
	rest.stocks.aggregates("AAPL", 1, "day", "2024-02-11", "2025-02-11").then((data) => {
		console.log(data);
	}).catch(e => {
		console.error('An error happened:', e);
	});
}

// API call
export async function stockBarGraph(stockID, mult=defPara.multiplier, bar=defPara.timePerBar, start=defPara.whenFrom, to=defPara.whenTo) {
	rest.stocks.aggregates(stockID, mult, bar, start, to).then((data) => {
		console.log(data);
		return data;
	}).catch(e => {
		console.error("You made an error dumbass", e);
		return null;
	});
}
