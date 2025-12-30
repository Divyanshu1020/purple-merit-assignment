import config from "@/config";
import winston from "winston";

const { combine, timestamp, printf, json, errors, align, colorize } = winston.format;

const transport: winston.transport[] = []

if (config.NODE_ENV !== "production") {
    transport.push(
        new winston.transports.Console({
            format: combine(
                colorize({all: true}),
                timestamp({format: "YYYY-MM-DD HH:mm:ss"}),
                printf(({level, message, timestamp, ...meta}) => {
                    const metaStr = Object.keys(meta).length ? `\n${JSON.stringify(meta)}` : "";
                    return `${timestamp} [${level.toUpperCase()}]: ${message}${metaStr}`;
                })
            )
                
        })
    )
}

const logger = winston.createLogger({
    level: config.LOG_LEVEL || "info",
    format: combine(
        timestamp(),
        errors({stack: true}),
        json(),
        // printf(({level, message, timestamp, ...meta}) => {
        //     const metaStr = Object.keys(meta).length ? `\n${JSON.stringify(meta)}` : "";
        //     return `${timestamp} [${level.toUpperCase()}]: ${message}${metaStr}`;
        // })
    ),
    transports: transport,
    silent: config.NODE_ENV === "test",
});


export {logger};