import { Router } from "express";
import Api from "../controllers/whatsapp";

// router
export const defaultRoute = Router();

// api
defaultRoute.get("/api", (req, res) => {
    Api
});

defaultRoute.post("/api", (req, res) => {
    Api
});
