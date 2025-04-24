import { restClient } from '@polygon.io/client-js';
//node --env-file=.env polygonIO.mjs
// Setup API Keys, setup default calls to be daily data displayed in bars that spans over
// a year ago from today

function APIsetup(){
    return restClient(process.env.EXPO_PUBLIC_POLY_API_KEY);
}
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
const rest = APIsetup();
// Manual Testing
if (false) {
	const rest = APIsetup();
	rest.stocks.aggregates("AAPL", 1, "day", "2024-02-11", "2025-02-11").then((data) => {
		console.log(data);
	}).catch(e => {
		console.error('An error happened:', e);
	});
}

// API call
export async function stockBarGraph(stockID, mult=defPara.multiplier, bar=defPara.timePerBar, start=defPara.whenFrom, to=defPara.whenTo) {
	const rest = APIsetup();
	return rest.stocks.aggregates(stockID, mult, bar, start, to).then((data) => {
		// console.log(data);
		return data;
	}).catch(e => {
		console.error("Data Error", e);
		return null;
	});
}

export async function stockAnalysis(stockID, mult=defPara.multiplier, bar=defPara.timePerBar, start=defPara.whenFrom, to=defPara.whenTo) {
	try {
		const stockData = await stockBarGraph(stockID, mult, bar, start, to);
		const result = stockData.results;
		const stat = calculateOvertimeDiff(result);
		console.log(stat)
	} catch(e) {
		console.error("Processing Error", e);
	}
}

function calculateOvertimeDiff(result) {
	let num = result[result.length - 1].c - result[0].c;
	let per = (result[result.length - 1].c / result[0].c - 1) * 100;
	let obj = {
		growth: num.toFixed(2),
		growthPer: per.toFixed(2),
		trend: result[result.length - 1].c > result[result.length - 2].c ? "Up": "Down"
	}
	return obj;
}


export default async function getDescription(ticker) {
	const rest = APIsetup();
	try {
	const data = await rest.reference.tickerDetails(ticker);
	const output = { 
		name: data.results.name,
		description:data.results.description,
	}
	return output;
	} catch (e) {
	console.error('An error happened:', e);
	return {name:"No name",description:"No Available Description!"};
	}

}
	
	
// Example usage:
getDescription("AAPL");
