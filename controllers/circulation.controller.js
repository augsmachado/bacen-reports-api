import request from "request";

const baseUrl =
	"https://olinda.bcb.gov.br/olinda/service/mecir_dinheiro_em_circulacao/version/v1/odata/";
const headers = { accept: "application/json;odata.metadata=minimal" };

const currencyUrl = "daily_report?$format=json";

export default class CirculationController {
	// Request daily records of the quantities of banknotes and coins in circulation
	static async getCurrencyCirculation(req, res) {
		let concat = "/daily_report?$format=json";

		const limit = req.query.limit;
		const date = req.query.date;
		const orderBy = req.query.orderBy;
		const filter = req.query.filter;

		// Compose the query parameters to be requested to the server
		try {
			// Is limit empty or bigger than zero?
			if (limit != null && limit > 0) {
				concat = concat + "&%24top=" + limit;
			}

			// Is date empty?
			if (date != null) {
				concat = concat + "&%24filter=Data%20eq%20" + date;
			}

			// Is order by empty and equal to asc or desc?
			if (
				orderBy != null &&
				(orderBy.toLowerCase() === "asc" ||
					orderBy.toLowerCase() === "desc")
			) {
				concat = concat + "&%24orderby=Data%20" + orderBy.toLowerCase();
			}
		} catch (err) {
			console.error(
				`Unable to concat query parameters to currency circulation daily report: ${err}`
			);
		}

		try {
			var options = {
				method: "GET",
				url: `${baseUrl}${concat}`,
				headers: headers,
			};

			request(options, (err, resp) => {
				if (err) throw new Error(err);

				const body = JSON.parse(resp.body);
				let results = [];

				// Is possible to filter the results using banknotes or coins?
				try {
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
}
