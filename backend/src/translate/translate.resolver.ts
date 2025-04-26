import { Resolver, Query, Args } from '@nestjs/graphql';
import { TranslateService } from './translate.service';
import { Translation } from './dto/translation.model';

@Resolver(() => Translation)
export class TranslateResolver {
  constructor(private readonly translateService: TranslateService) {}

  @Query(() => Translation)
  async translate(@Args('text') text: string): Promise<Translation> {
    const translatedText = await this.translateService.translate(text);
    return {
      original: text,
      translated: translatedText,
    };
  }
}
