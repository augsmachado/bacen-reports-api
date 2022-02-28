import request from "request";

const baseUrl = "https://olinda.bcb.gov.br/olinda/service";
const headers = { accept: "application/json;odata.metadata=minimal" };
export default class ReportsController {
	static async getSelicDaily(req, res) {
		const { format, orderBy, limit, skip } = req.params;

		try {
			var options = {
				method: "GET",
				url: `${baseUrl}/ResumoCamaras_en/version/v1/odata/Selic`,
				headers: headers,
			};
			request(options, (err, response) => {
				if (err) throw new Error(err);

				const body = JSON.parse(response.body);

				console.log(body.value[body.value.length - 1]);
				res.json(body.value);
			});
		} catch (err) {
			res.json(err);
		}
	}
}
