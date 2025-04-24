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
// Manual Testing
// if (false) {
// 	const rest = APIsetup();
// 	rest.stocks.aggregates("AAPL", 1, "day", "2024-02-11", "2025-02-11").then((data) => {
// 		console.log(data);
// 	}).catch(e => {
// 		console.error('An error happened:', e);
// 	});
// }

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


function getDateRangeFromPeriod(period) {
	const end = new Date();
	end.setDate(end.getDate() - 1); // use yesterday as end
	const start = new Date(end);

	switch (period) {
		case "1D":
			start.setDate(end.getDate() - 1);
			break;
		case "1W":
			start.setDate(end.getDate() - 7);
			break;
		case "1Y":
			start.setFullYear(end.getFullYear() - 1);
			break;
		case "2Y":
			start.setFullYear(end.getFullYear() - 2);
			break;
		default:
			throw new Error(`Unsupported period: ${period}`);
	}

	const range = {
		from: start.toISOString().split("T")[0],
		to: end.toISOString().split("T")[0]
	};
	console.log(`Date range for ${period}:`, range);
	return range;
}

export async function getStockDataByPeriod(stockID, period) {
	const { from, to } = getDateRangeFromPeriod(period);
	try {
		const data = await stockBarGraph(stockID, 1, "day", from, to);
		if (data && data.results && data.results.length > 1) {
			const analysis = calculateOvertimeDiff(data.results);
			console.log(`Final output for ${stockID} (${period}):`, analysis);
			return {
				period,
				data: data.results,
				analysis,
			};
		} else {
			console.warn(`No data available for ${stockID} over ${period}`);
			return {
				period,
				data: [],
				analysis: { error: "Insufficient data" }
			};
		}
	} catch (e) {
		console.error(`Error fetching stock data for ${period}:`, e);
		return {
			period,
			data: [],
			analysis: { error: "Fetch error" }
		};
	}
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
// getDescription("AAPL");
getStockDataByPeriod("AAPL", "1W")



