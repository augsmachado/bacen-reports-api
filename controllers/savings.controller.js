import request from "request";

const BASE_URL = "https://www3.bcb.gov.br/rdrweb/rest/ext/ranking";
const HEADERS = { accept: "application/json;odata.metadata=minimal" };

export default class SavingsController {
	static async getSavingDeposits(req, res) {
		res.json({ test: "Saving" });
	}
}
