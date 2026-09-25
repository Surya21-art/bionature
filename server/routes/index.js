import { Router } from "express";
import healthRouter from "./health.js";
import authRouter from "./auth.js";
import productsRouter from "./products.js";
import enquiriesRouter from "./enquiries.js";
import farmerHelpRouter from "./farmerHelp.js";
import distributorsRouter from "./distributors.js";
import aiRouter from "./ai.js";

const router = Router();

router.use("/", healthRouter);
router.use("/auth", authRouter);
router.use("/products", productsRouter);
router.use("/enquiries", enquiriesRouter);
router.use("/farmer-help", farmerHelpRouter);
router.use("/distributors", distributorsRouter);
router.use("/ai", aiRouter);

export default router;
