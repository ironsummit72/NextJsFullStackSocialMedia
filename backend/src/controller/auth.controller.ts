import { Request, Response } from "express";
export function handleLogin(req: Request, res: Response) {
  return res.status(200).send("success");
}
export function handleRegister(req: Request, res: Response) {
  return res.status(200).send("success");
}
