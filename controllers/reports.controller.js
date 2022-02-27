import pkg from "uuid";
import request from "request";

const { v4: uuidv4 } = pkg;

export default class ReportsController {
	static async getCurrencyDailyReport(req, res) {
		try {
			var options = {
				method: "GET",
				url: "https://olinda.bcb.gov.br/olinda/service/ResumoCamaras_en/version/v1/odata/Cetip?%24format=json&%24top=5",
				headers: {
					accept: "application/json;odata.metadata=minimal",
				},
			};
			request(options, function (error, response) {
				if (error) throw new Error(error);
				res.json(JSON.parse(response.body));
			});
		} catch (err) {
			res.json(err);
		}
	}
}
