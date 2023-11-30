import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    use(req: Request, res: Response, next: NextFunction) {
        console.log('Request...')
        next();
    }
}