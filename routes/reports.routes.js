import express from "express";

import CirculationCtrl from "../controllers/circulation.controller.js";

const router = express.Router();

/*
 * Currency in circulation daily report
 * Daily report presents information about the quantities of banknotes and coins in circulation (commemorative coins are't includeded).
 * The information is separated by type (banknote or coin) and denomination of Brazilian Real (symbols: R$, BRL)
 */
router.route("/circulation").get(CirculationCtrl.getCurrencyCirculation);

/*
 * Currency in circulation detailed daily report
 * The available file presents daily information on the quantities of banknotes and coins in circulation (commemorative coins are not
 * included). The information is separated by type (banknote or coin), series and denomination of the brazilian Real (symbols: R$, BRL).
 */
router
	.route("/circulation/detailed")
	.get(CirculationCtrl.getCurrencyCirculationDetailed);

export default router;
