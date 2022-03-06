import express from "express";

import status from "./routes/status.routes.js";
import reports from "./routes/reports.routes.js";
import rankings from "./routes/rankings.routes.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/status", status);
app.use("/api/v1/reports", reports);
app.use("/api/v1/rankings", rankings);

app.use("*", (req, res) => {
	res.status(400).json({ error: "Not route found" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
