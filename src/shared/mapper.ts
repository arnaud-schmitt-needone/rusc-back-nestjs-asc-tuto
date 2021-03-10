import { HeroDto } from 'src/hero/dto/hero.dto';
import { HeroEntity } from 'src/hero/entity/hero.entity';

export const toHeroDto = (data: HeroEntity): HeroDto => {
  const { id, name } = data;

  const heroDto: HeroDto = { id, name };

  return heroDto;
};
