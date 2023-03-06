import { RequestHandler } from "express";
import { createSession, listSessions } from "../wa";

export const list:RequestHandler = (req, res) => {
    res.status(200).json(listSessions());
}

export const add:RequestHandler = async (req,res) => {
    const { sessionId } = req.body;
    createSession({ sessionId });
}