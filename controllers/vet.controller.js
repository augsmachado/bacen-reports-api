/**
 * Provides a list of the average VET practiced by institutions authorized by the Central Bank to operate
 * in the foreign exchange Market in the reference month, as of May 2013. Total Effective Value (VET)
 * represents the cost of a foreign exchange operation in reals per unit of foreign currency,
 * considering the exchange rate, taxes and tariffs eventually charged.
 */

import request from "request";

const BASE_URL = "https://www3.bcb.gov.br/vet/rest/v2";
const HEADERS = { accept: "application/json;odata.metadata=minimal" };

const DATE_SIZE = 7;
const CURRENCY_SIZE = 3;
export default class VetController {
	static async getVetRanking(req, res) {
		let concat = "/ranking";

		const monthYear = req.query.monthYear; //std mesAno
		const value = req.query.value;
		const currency = req.query.currency;
		const purpose = req.query.purpose;
		const deliveryForms = req.query.deliveryForm;

		// Validate date format and concat them with BASE_URL
		try {
			if (
				monthYear.toString().length === DATE_SIZE ||
				monthYear.toString().length === DATE_SIZE - 1
			) {
				const date = monthYear.replace("-", "");
				concat = concat + "?mesAno=" + date;
			}
		} catch (err) {
			console.error(
				`Unable to request the VET ranking because DATE parameter mustn't be empty or the size string has more than ${DATE_SIZE} characters`
			);

			return false;
		}

		// Validate value format and concat them with BASE_URL
		try {
			if (value >= 1) {
				concat = concat + "&valor=" + value;
			}
		} catch (err) {
			console.error(
				`Unable to request the VET ranking because VALUE parameter mustn't be greater or equal than 1`
			);
			return false;
		}

		// Validate currency format and concat them with BASE_URL
		try {
			if (currency.toString().length === CURRENCY_SIZE) {
				concat = concat + "&moeda=" + currency.toString().toUpperCase();
			}
		} catch (err) {
			console.error(
				`Unable to request the VET ranking because CURRENCY parameter mustn't be empty or the size string has more than ${CURRENCY_SIZE} characters`
			);
			return false;
		}

		// Validate purpose format and concat them with BASE_URL
		try {
			if (purpose.length > 0 && purpose > 0) {
				concat = concat + "&finalidade=" + purpose;
			}
		} catch (err) {
			console.error(
				`Unable to request VET ranking because PURPOSE parameter mustn't be empty`
			);
			return false;
		}

		// Validate delivery format and concat them with BASE_URL
		try {
			if (deliveryForms.length > 0 && deliveryForms > 0) {
				concat =
					concat + "&tipoOperacao=C&formaDeEntrega=" + deliveryForms;
			}
		} catch (err) {
			console.error(
				`Unable to request VET ranking because DELIVERY FORMS parameter mustn't be empty`
			);
			return false;
		}

		try {
			var options = {
				method: "GET",
				url: `${BASE_URL}${concat}`,
				headers: HEADERS,
			};
			request(options, (err, response) => {
				if (err) throw new Error(err);

				const body = JSON.parse(response.body);

				res.json(body);
			});
		} catch (err) {
			res.json(`Unable to request the VET purposes: ${err}`);
		}
	}

	static async getVetPurposes(req, res) {
		try {
			var options = {
				method: "GET",
				url: `${BASE_URL}/dominio/finalidades`,
				headers: HEADERS,
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
				url: `${BASE_URL}/dominio/formasDeEntrega`,
				headers: HEADERS,
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
				url: `${BASE_URL}/dominio/moedas`,
				headers: HEADERS,
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
				url: `${BASE_URL}/dominio/paises`,
				headers: HEADERS,
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

	static async getVetFinancialInstitutions(req, res) {
		try {
			var options = {
				method: "GET",
				url: `${BASE_URL}/instituicoesFinanceiras`,
				headers: HEADERS,
			};
			request(options, (err, response) => {
				if (err) throw new Error(err);

				const body = JSON.parse(response.body);
				let results = [];

				for (const key in body.instituicoesFinanceiras) {
					let temp = {
						name: body.instituicoesFinanceiras[key].nome,
						taxId: body.instituicoesFinanceiras[
							key
						].cnpj.toString(),
						site: body.instituicoesFinanceiras[key]
							.enderecoEletronico,
					};
					results.push(temp);
				}

				res.json(results);
			});
		} catch (err) {
			res.json(
				`Unable to request the list of institutions authorized by the Central Bank to operate in the VET market: ${err}`
			);
		}
	}

	static async getVetExchangeLocations(req, res) {
		const ispb = req.params.ispb;
		let concat = "/listaPontoCambio?cnpj=" + ispb;

		try {
			var options = {
				method: "GET",
				url: `${BASE_URL}${concat}`,
				headers: HEADERS,
			};
			request(options, (err, response) => {
				if (err) throw new Error(err);

				let results = [];
				const body = JSON.parse(response.body);

				if (body.listaPontoCambio <= 0) {
					res.send({
						error: "Inform the ISPB of a financial institution authorized to operate in VET",
						explanation:
							"ISPB is the first 8 numbers of TAX ID: 00000000 is ISPB of Brazil Bank",
					});
				} else {
					for (const key in body.listaPontoCambio) {
						let temp = {
							name: body.listaPontoCambio[key].nome,
							taxId: body.listaPontoCambio[key].cnpj.toString(),
							address: body.listaPontoCambio[key].endereco,
							city: body.listaPontoCambio[key].cidade,
							state: body.listaPontoCambio[key].uf,
							latitude:
								body.listaPontoCambio[key].latitude.toString(),
							longitude:
								body.listaPontoCambio[key].longitude.toString(),
							customerService:
								body.listaPontoCambio[key].tipoAtendimento,
							typeService: body.listaPontoCambio[key].tipoServico,
							onlyClients:
								body.listaPontoCambio[key].somenteClientes,
							openingBusinessDay:
								body.listaPontoCambio[key].horaAbreDiaUtil,
							closingBusinessDay:
								body.listaPontoCambio[key].horaFechaDiaUtil,
							openingSaturday:
								body.listaPontoCambio[key].horaAbreSabado,
							closingSaturday:
								body.listaPontoCambio[key].horaFechaSabado,
							openingSunday:
								body.listaPontoCambio[key].horaAbreDomingo,
							closingSunday:
								body.listaPontoCambio[key].horaFechaDomingo,
							openingHoliday:
								body.listaPontoCambio[key].horaAbreFeriado,
							closingHoliday:
								body.listaPontoCambio[key].horaFechaFeriado,
							phone1: body.listaPontoCambio[
								key
							].telefone1.toString(),
							phone2: body.listaPontoCambio[
								key
							].telefone2.toString(),
						};
						results.push(temp);
					}

					res.json(results);
				}
			});
		} catch (err) {
			res.json(
				`Unable to request the list of locations to purchase and sell foreign currency in the VET market: ${err}`
			);
		}
	}
}
