import { Controller, Get, Request } from "@nestjs/common";
import { readFileSync } from "fs";
import { resolve } from "path";

@Controller('/')
export class AppController {
  constructor() { }

  @Get('/')
  async home(@Request() req: Request) {
    let template = readFileSync(resolve(__dirname, "../index.html"))
    // template = await transform
    return req.url;
  }
}
