import { Module } from '@nestjs/common';
// import { UserModule } from './modules/user.module';
import { CatModule } from './modules/cat.module';
import { AuthModule } from './modules/auth.module';

@Module({
  imports: [CatModule, AuthModule],
})
export class AppModule {
}
