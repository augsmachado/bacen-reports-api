/**
 * Provides a list of the average VET practiced by institutions authorized by the Central Bank to operate
 * in the foreign exchange Market in the reference month, as of May 2013. Total Effective Value (VET)
 * represents the cost of a foreign exchange operation in reals per unit of foreign currency,
 * considering the exchange rate, taxes and tariffs eventually charged.
 */

import request from "request";

const baseUrl = "https://www3.bcb.gov.br/vet/rest/v2";
const headers = { accept: "application/json;odata.metadata=minimal" };

export default class VetController {
	static async getVetRanking(req, res) {}

	static async getVetPurposes(req, res) {
		try {
			var options = {
				method: "GET",
				url: `${baseUrl}/dominio/finalidades`,
				headers: headers,
			};
			request(options, (err, response) => {
				if (err) throw new Error(err);

				let results = [];
				try {
					const body = JSON.parse(response.body);
					for (const key in body.finalidade) {
						let temp = {
							code: body.finalidade[key].codigo,
							descriptions: body.finalidade[key].descricao,
						};

						results.push(temp);
					}
				} catch (err) {
					console.error(
						`Unable to parse VET purposes response: ${err}`
					);
				}

				res.json(results);
			});
		} catch (err) {
			res.json(`Unable to request the VET purposes: ${err}`);
		}
	}

	static async getVetDeliveryForms(req, res) {
		try {
			var options = {
				method: "GET",
				url: `${baseUrl}/dominio/formasDeEntrega`,
				headers: headers,
			};
			request(options, (err, response) => {
				if (err) throw new Error(err);
				const body = JSON.parse(response.body);
				let results = [];
				try {
					for (const key in body.formaDeEntrega) {
						let temp = {
							code: body.formaDeEntrega[key].codigo,
							descriptions: body.formaDeEntrega[key].descricao,
						};

						results.push(temp);
					}
				} catch (err) {
					console.error(
						`Unable to parse forms of delivery of the foreign currency response: ${err}`
					);
				}

				res.json(results);
			});
		} catch (err) {
			res.json(
				`Unable to request the VET forms of delivery of the foreign currency: ${err}`
			);
		}
	}

	static async getVetCurrencies(req, res) {}

	static async getVetDestination(req, res) {}
}
