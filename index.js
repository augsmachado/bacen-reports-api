import express from "express";

import status from "./routes/status.routes.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/v1/status", status);
app.use("*", (req, res) => {
	res.status(400).json({ error: "Not route found" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
