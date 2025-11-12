import express from "express";
import cors from "cors";
import routes from "../routes/index.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", routes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 API v1 sur http://localhost:${PORT}/api/v1`));
