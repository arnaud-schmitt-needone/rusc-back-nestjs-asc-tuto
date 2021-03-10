import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HeroModule } from './hero/hero.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [HeroModule],
})
export class AppModule {}
