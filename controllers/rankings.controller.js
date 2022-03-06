import request from "request";

const baseUrl = "https://www3.bcb.gov.br/rdrweb/rest/ext/ranking";
const headers = { accept: "application/json;odata.metadata=minimal" };

export default class RankingsController {
	static async getEveryExistingClaims(req, res) {
		const year = req.query.year;

		try {
			var options = {
				method: "GET",
				url: `${baseUrl}`,
				headers: headers,
			};
			request(options, (err, response) => {
				if (err) throw new Error(err);

				const body = JSON.parse(response.body);

				let results = [];

				// Is it possible filter the results for specific year?
				try {
					if (year != null || year != undefined) {
						for (const years in body.anos) {
							if (body.anos[years].ano === year) {
								results.push(body.anos[years]);
							}
						}
					} else {
						results = body.anos;
					}
				} catch (err) {
					console.error(
						`Unable to filter the results by year: ${err}`
					);
				}

				res.json(results);
			});
		} catch (err) {
			res.json(err);
		}
	}
}
