import { Request, Response } from "express";
import crypto from "crypto";

export const verifyWebhookSignature = (req: Request, res: Response, next: any) => {
  try{
    const signature = req.headers['x-signature'];
    const xTimestamp = req.headers['x-timestamp'];
    const secret = process.env.AIRWALLEX_WEBHOOK_SECRET;

    if (!signature || !xTimestamp || !secret) return res.status(400).json({ message: "Missing signature or timestamp" });
    console.log(signature, xTimestamp);
    const valueToDigest = xTimestamp + JSON.stringify(req.body);
    const hmac = crypto.createHmac('sha256', secret);
    const digest = hmac.update(valueToDigest).digest('hex');
    console.log(digest)
    if (digest !== signature) return res.status(400).json({ message: "Invalid signature" });
    next();
  } catch (error) {
    
  }
}