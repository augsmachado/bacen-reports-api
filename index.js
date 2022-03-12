import express from "express";

import status from "./routes/status.routes.js";
import circulation from "./routes/circulation.routes.js";
import claims from "./routes/claims.routes.js";
import vet from "./routes/vet.routes.js";
import savings from "./routes/savings.routes.js";
import ccr from "./routes/ccr.routes.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/status", status); // ok
app.use("/api/v1/circulation", circulation); // ok
app.use("/api/v1/claims", claims); // ok
app.use("/api/v1/vet", vet); // ok
app.use("/api/v1/ccr", ccr);
app.use("/api/v1/savings", savings);

app.use("*", (req, res) => {
	res.status(400).json({ error: "Not route found" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
