import express from "express";
import ReportsCtrl from "../controllers/reports.controller.js";

const router = express.Router();

/*
 * Currency in circulation
 *
 * - Daily report presents information about the quantities of banknotes and coins in circulation (commemorative coins are't includeded).
 * The information is separated by type (banknote or coin) and denomination of Brazilian Real (symbols: R$, BRL)
 */
router.route("/currency/daily").get(ReportsCtrl.getCurrencyDailyReport);

export default router;
