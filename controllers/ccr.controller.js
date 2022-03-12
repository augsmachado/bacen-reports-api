import request from "request";

const BASE_URL =
	"https://olinda.bcb.gov.br/olinda/service/CCR/version/v1/odata/AuthorizedFinancialInstitutions?$format=json";
const HEADERS = { accept: "application/json;odata.metadata=minimal" };

export default class CCRController {
	static async getCCRFinancialInstitutions(req, res) {
		const name = req.query.name;
		const sicapCode = req.query.sicapCode;
		try {
			var options = {
				method: "GET",
				url: `${BASE_URL}&$orderby=Country%20asc`,
				headers: HEADERS,
			};

			request(options, (err, response) => {
				if (err) throw new Error(err);

				const body = JSON.parse(response.body);
				let results = [];

				if (name !== undefined && name !== null) {
					let search = body.value.find(
						(value) => value.Name === name.toUpperCase()
					);
					results.push(search);
				} else if (sicapCode !== undefined && sicapCode !== null) {
					let search = body.value.find(
						(value) => value.SicapCode === sicapCode
					);
					results.push(search);
				} else {
					results = body.value;
				}

				res.json(results);
			});
		} catch (err) {
			console.error(
				`Unable to request the list of CCR financial institutions: ${err}`
			);
		}
	}

	static async getCCRCountries(req, res) {
		try {
			var options = {
				method: "GET",
				url: `${BASE_URL}&$orderby=Country%20asc&$select=Country`,
				headers: HEADERS,
			};

			request(options, (err, response) => {
				if (err) throw new Error(err);

				const body = JSON.parse(response.body);

				let results = [];
				let temp = 0;
				results.push(body.value[0].Country);

				for (let key = 1; key < body.value.length; key++) {
					if (body.value[key].Country !== results[temp]) {
						results.push(body.value[key].Country);
						temp++;
					}
				}

				res.json(results);
			});
		} catch (err) {
			console.error(
				`Unable to request the list of countries participats in CCR: ${err}`
			);
		}
	}
}
