import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { Cat } from "./interface/cat.interface";
import { CreateCatDto, UpdateCatDto } from "./model/cat.dto";
import { CatService } from "./cat.service";

@Controller("cat")
export class CatController {
  /** Cat Controller
   * Controller for /cat route
   */
  constructor(private catsService: CatService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
    return `This action created a cat with name: ${createCatDto.name}`;
  }

  @Get()
  // @Query() query: CatsQuery
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return `This action returns cat #${id}`;
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() updateCatDto: UpdateCatDto) {
    return `This action changes cat #${id} to some value from ${updateCatDto}`;
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return `This action removes a #${id} cat`;
  }
}
