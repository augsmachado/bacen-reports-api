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
	static async getVetRanking(req, res) {
		//https://www3.bcb.gov.br/vet/rest/v2/ranking?mesAno=022017&valor=100&moeda=USD
		//&finalidade=1&tipoOperacao=C&formaDeEntrega=1
		//mesAno
		//valor
		//moeda = currency
		//finalidade = purposes
		//formaDeEntrega = delivery-forms
	}

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

				let results = [];
				try {
					const body = JSON.parse(response.body);

					for (const key in body.formaDeEntrega) {
						let temp = {
							code: body.formaDeEntrega[key].codigo,
							descriptions: body.formaDeEntrega[key].descricao,
						};

						results.push(temp);
					}
				} catch (err) {
					console.error(
						`Unable to parse VET forms of delivery of the foreign currency response: ${err}`
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

	static async getVetCurrencies(req, res) {
		try {
			var options = {
				method: "GET",
				url: `${baseUrl}/dominio/moedas`,
				headers: headers,
			};
			request(options, (err, response) => {
				if (err) throw new Error(err);

				let results = [];
				try {
					const body = JSON.parse(response.body);

					for (const key in body.moeda) {
						let temp = {
							code: body.moeda[key].codigo,
							description: body.moeda[key].descricao,
						};

						results.push(temp);
					}
				} catch (err) {
					console.error(
						`Unable to parse response of the list of currencies in the VET ranking: ${err}`
					);
				}

				res.json(results);
			});
		} catch (err) {
			res.json(
				`Unable to request the list of the existing currencies in the VET ranking: ${err}`
			);
		}
	}

	static async getVetDestination(req, res) {
		try {
			var options = {
				method: "GET",
				url: `${baseUrl}/dominio/paises`,
				headers: headers,
			};
			request(options, (err, response) => {
				if (err) throw new Error(err);

				let results = [];
				try {
					const body = JSON.parse(response.body);

					for (const key in body.pais) {
						if (
							body.pais[key].codigo !== "" &&
							body.pais[key].descricao !== ""
						) {
							let temp = {
								code: body.pais[key].codigo,
								description: body.pais[key].descricao,
							};
							results.push(temp);
						}
					}
				} catch (err) {
					console.error(
						`Unable to parse response of the list of destination countries in the VET ranking: ${err}`
					);
				}

				res.json(results);
			});
		} catch (err) {
			res.json(
				`Unable to request the list of existing destination countries in the VET ranking: ${err}`
			);
		}
	}
}
