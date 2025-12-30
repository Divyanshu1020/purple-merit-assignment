import {rateLimit} from "express-rate-limit";

const ExpressRateLimit = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: {
        error: "Too many requests from this IP, please try again after 15 minutes"
    }
});


export default ExpressRateLimit;