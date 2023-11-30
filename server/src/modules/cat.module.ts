import { Module } from "@nestjs/common";
import { CatController } from "src/controller/cat.controller";
import { CatService } from "src/service/cat.service";
import { PrismaModule } from "./prisma.module";

@Module({
    imports: [PrismaModule],
    controllers: [CatController],
    providers: [CatService],
    exports: [CatService]
})
export class CatModule {}