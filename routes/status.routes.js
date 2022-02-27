import express from "express";
import StatusCtrl from "../controllers/status.controller.js";

const router = express.Router();

router.route("/").get(StatusCtrl.getStatus);

export default router;
