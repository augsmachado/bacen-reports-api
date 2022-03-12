import express from "express";

import ClaimsCtrl from "../controllers/claims.controller.js";

const router = express.Router();

// Request every claims per year
router.route("/").get(ClaimsCtrl.getEveryExistingClaims);

export default router;
