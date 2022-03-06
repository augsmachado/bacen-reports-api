import request from "request";

const baseUrl =
	"https://olinda.bcb.gov.br/olinda/service/mecir_dinheiro_em_circulacao/version/v1/odata/";
const headers = { accept: "application/json;odata.metadata=minimal" };

const MAX_NUMBER_OF_RESULTS_PER_PAGE = 20;

export default class CirculationController {
	// Request daily records of the quantities of banknotes and coins in circulation
	static async getCurrencyCirculation(req, res) {
		let concat = "daily_report?%24format=json";

		const limit = req.query.limit;
		const date = req.query.date;
		const filter = req.query.filter;

		// Compose the query parameters to be requested to the server
		try {
			// Is limit empty or bigger than zero?
			// If yes, show the first result order by desc
			if (
				limit != null &&
				limit > 0 &&
				limit <= MAX_NUMBER_OF_RESULTS_PER_PAGE
			) {
				concat = `${concat}&%24top=${limit}&%24orderby=Data%20desc`;
			} else {
				concat = concat + "&%24top=20&%24orderby=Data%20desc";
			}

			// Is date empty?
			if (date != null) {
				concat = concat + "&%24filter=Data%20eq%20" + date;
			}
		} catch (err) {
			console.error(
				`Unable to concat query parameters to currency circulation daily report: ${err}`
			);
		}

		// Create request to Bacen
		try {
			var options = {
				method: "GET",
				url: `${baseUrl}${concat}`,
				headers: headers,
			};

			request(options, (err, resp) => {
				if (err) throw new Error(err);

				// Is possible to filter the results using banknotes or coins?
				let results = [];
				try {
					const body = JSON.parse(resp.body);
					if (filter != null) {
						for (const value in body.value) {
							if (
								body.value[value].Especie.toLowerCase() ===
								filter.toLowerCase()
							) {
								results.push(body.value[value]);
							}
						}
					} else {
						results = body.value;
					}
				} catch (err) {
					console.error(`Unable to filter the results: ${err}`);
				}

				/* TODO
				 *   This code should be improved to show the results filtered and using the limit results instead
				 *   Today, if you filter the results and aply a limit, don't show the results filtered according to the limit
				 *   only show the length of the results filtered
				 */
				let response = {
					length: results.length,
					results: results,
				};

				res.json(response);
			});
		} catch (err) {
			console.error(
				`Unable to request report of daily currency in circulation: ${err}`
			);
		}
	}

	static async getCurrencyCirculationDetailed(req, res) {
		let concat = "detailed_daily_report?%24format=json";
		let numberResultsPerPage = MAX_NUMBER_OF_RESULTS_PER_PAGE;
		let page = 0;

		const date = req.query.date;
		const filter = req.query.filter;

		if (req.query.page < 0 || req.query.page === undefined) page = 0;
		else page = req.query.page;

		// Compose the query parameters to be requested to the server
		try {
			if (page >= 0) {
				// Case the number of pages as bigger than zero, then subtract one and multiply for numberResultsPerPage
				// In disagree with the above sentence, multiply by the numberResultsPerPage to zero
				const skip = numberResultsPerPage * (page > 0 ? page - 1 : 0);
				const limit = numberResultsPerPage * (page > 0 ? page : 1);
				concat =
					concat +
					"&%24orderby=Date%20desc&%24skip=" +
					skip +
					"&%24top=" +
					limit;
			} else if (date != null && date != undefined) {
				// Is date empty?
				concat = concat + "&%24filter=Date%20eq%20" + date;
			}
		} catch (err) {
			console.error(
				`Unable to concat query parameters to currency circulation daily report detailed: ${err}`
			);
		}

		// Create request to Bacen
		try {
			var options = {
				method: "GET",
				url: `${baseUrl}${concat}`,
				headers: headers,
			};

			request(options, (err, resp) => {
				if (err) throw new Error(err);

				// Is possible to filter the results using banknotes or coins?
				let results = [];
				try {
					const body = JSON.parse(resp.body);
					if (filter != null) {
						for (const value in body.value) {
							if (
								body.value[value].Type.toLowerCase() ===
								filter.toLowerCase()
							) {
								results.push(body.value[value]);
							}
						}
					} else {
						results = body.value;
					}
				} catch (err) {
					console.error(`Unable to filter the results: ${err}`);
				}

				let response = {
					page: page,
					length: results.length,
					results: results,
				};

				res.json(response);
			});
		} catch (err) {
			console.error(
				`Unable to request report of daily currency in circulation: ${err}`
			);
		}
	}
}
