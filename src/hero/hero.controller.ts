import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { HeroCreateDto } from './dto/hero-create.dto';
import { HeroListDto } from './dto/hero-list.dto';
import { HeroDto } from './dto/hero.dto';
import { HeroService } from './hero.service';

@Controller('/api/heroes')
export class HeroController {
  constructor(private readonly heroService: HeroService) {}

  @Get()
  async findAll(@Query() query: { name: string }): Promise<HeroListDto> {
    if (query && query.name) {
      return await this.heroService.getByName(query.name);
    }
    return await this.heroService.getAllHeroes();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<HeroDto> {
    return await this.heroService.getOneHero(id);
  }

  @Post()
  async create(@Body() heroCreateDto: HeroCreateDto): Promise<HeroDto> {
    return await this.heroService.createHero(heroCreateDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() heroDto: HeroDto,
  ): Promise<HeroDto> {
    return await this.heroService.updateHero(id, heroDto);
  }

  @Delete(':id')
  async destory(@Param('id') id: string): Promise<HeroDto> {
    return await this.heroService.destoryHero(id);
  }
}
