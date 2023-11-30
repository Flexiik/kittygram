import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { Cat as CatModel } from "@prisma/client";
import { CatService } from "src/service/cat.service";

@Controller("/api/cat")
export class CatController {
  constructor(private readonly catService: CatService) {}

  @Get()
  async getAllCats(): Promise<CatModel[]> {
    return this.catService.cats({
      where: {},
    });
  }

  @Get("/:id")
  async getCatById(@Param("id") id: string): Promise<CatModel> {
    return this.catService.cat({ id: Number(id) });
  }

  @Post()
  async createCat(
    @Body() createData: { name: string; age: number; breed?: string },
  ): Promise<CatModel> {
    return this.catService.createCat(createData);
  }

  @Put("/:id")
  async updateCat(
    @Body() updateData: { name?: string; age?: number; breed?: string },
    @Param("id") id: string,
  ): Promise<CatModel> {
    return this.catService.updateCat({
      where: { id: Number(id) },
      data: updateData,
    });
  }

  @Delete("/:id")
  async deleteCat(@Param("id") id: string): Promise<CatModel> {
    return this.catService.deleteCat({
      id: Number(id),
    });
  }
}
