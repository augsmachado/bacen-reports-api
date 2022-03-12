/**
 * The ranking of claims consolidates the citizens claims against Financial Institutions that were
 * received, analyzed and closed by the Central Bank in each reference period. The calculation
 * of the claims index considers the amount of regulated claims with evidences of noncompliance
 * per each one million clients of the financial institution.
 */

import request from "request";

const BASE_URL = "https://www3.bcb.gov.br/rdrweb/rest/ext/ranking";
const HEADERS = { accept: "application/json;odata.metadata=minimal" };

export default class ClaimsController {
	static async getEveryExistingClaims(req, res) {
		const year = req.query.year;

		try {
			var options = {
				method: "GET",
				url: `${BASE_URL}/`,
				headers: HEADERS,
			};
			request(options, (err, response) => {
				if (err) throw new Error(err);

				const body = JSON.parse(response.body);

				let results = [];

				// Is it possible filter the results for specific year?
				try {
					if (year !== null || year !== undefined) {
						let search = body.anos.find(
							(value) => value.ano === year
						);
						results.push(search);
					} else {
						results = body.anos;
					}
				} catch (err) {
					console.error(
						`Unable to filter the claims results by year: ${err}`
					);
				}

				res.json(results);
			});
		} catch (err) {
			res.json(`Unable to request report of bank claims: ${err}`);
		}
	}
}
