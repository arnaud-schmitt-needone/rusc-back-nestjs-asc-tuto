import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { heroes } from 'src/mock/hero.mock';
import { toHeroDto } from 'src/shared/mapper';
import { toPromise } from 'src/shared/utils';
import { HeroCreateDto } from './dto/hero-create.dto';
import { HeroDto } from './dto/hero.dto';
import { HeroEntity } from './entity/hero.entity';
import { v4 as uuid } from 'uuid';
import { HeroListDto } from './dto/hero-list.dto';

@Injectable()
export class HeroService {
  heroes: HeroEntity[] = heroes;

  // GET BY ID
  async getOneHero(id: string): Promise<HeroDto> {
    const hero = this.heroes.find((hero) => hero.id === id);

    if (!hero) {
      throw new HttpException(
        `Hero item doesn't exist`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return toPromise(toHeroDto(hero));
  }

  // GET
  async getAllHeroes(): Promise<HeroListDto> {
    return toPromise({ heroes: heroes.map((hero) => toHeroDto(hero)) });
  }

  // GET BY NAME
  async getByName(name: string): Promise<HeroListDto> {
    const searchResult = heroes.filter((hero) =>
      hero.name.toLowerCase().includes(name.toLowerCase()),
    );
    return toPromise({ heroes: searchResult.map((hero) => toHeroDto(hero)) });
  }

  // POST
  async createHero(heroDto: HeroCreateDto): Promise<HeroDto> {
    const { name } = heroDto;

    const hero: HeroEntity = {
      id: uuid(),
      name,
    };

    this.heroes.push(hero);
    return toPromise(toHeroDto(hero));
  }

  // DELETE
  destoryHero(id: string): Promise<HeroDto> {
    const deleteId = this.heroes.findIndex((hero) => hero.id === id);
    const result = this.heroes.find((hero) => hero.id === id);

    heroes.splice(deleteId, 1);

    return toPromise(result);
  }

  // UPDATE
  updateHero(id: string, heroDto: HeroDto): Promise<HeroDto> {
    const deleteId = this.heroes.findIndex((hero) => hero.id === id);
    const originalHero = this.heroes.find((hero) => hero.id === id);

    heroes.splice(deleteId, 1);

    const updatedHero: HeroEntity = {
      id: originalHero.id,
      name: heroDto.name,
    };

    heroes.push(updatedHero);

    return toPromise(updatedHero);
  }
}
