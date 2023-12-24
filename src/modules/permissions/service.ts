import { Injectable } from '@nestjs/common';

@Injectable()
export class PermissionService {
  constructor() { }

  async create(){
    console.log("create function call")
  }
}
