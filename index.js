import express from "express";

import status from "./routes/status.routes.js";
import circulation from "./routes/circulation.routes.js";
import vet from "./routes/vet.routes.js";
import ccr from "./routes/ccr.routes.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/status", status);
app.use("/api/v1/circulation", circulation);
app.use("/api/v1/vet", vet);
app.use("/api/v1/ccr", ccr);

app.use("*", (req, res) => {
	res.status(400).json({ error: "Not route found" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
