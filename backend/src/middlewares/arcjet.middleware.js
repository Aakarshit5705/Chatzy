import aj from "../lib/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";

export const arcjetProtection=async(req,res,next)=>{ 
    try {
        const decision=await aj.protect(req)

        if(decision.isDenied()){
            if(decision.reason.isRateLimit()){
                return res.status(429).json({message:"Too Many Requests!! Try Again Later :)"})
            }
            else if(decision.reason.isBot()){
                return res.status(403).json({message:"Bot Access Denied!!"})
            }else{
                return res.status(403).json({message:"Access Denied by security policy!!"})
            }
        }
        if (decision.results.some(isSpoofedBot)) {
      return res.status(403).json({
        error: "Spoofed bot detected",
        message: "Malicious bot activity detected.",
      });
    }

    next();
    } catch (error) {
        console.log("ArcJet Protection Error: ",error);
        next();
    }
}