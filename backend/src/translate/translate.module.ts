import { Module } from '@nestjs/common';
import { TranslateResolver } from './translate.resolver';
import { TranslateService } from './translate.service';
import { OpenaiModule } from 'src/openai/openai.module';

@Module({
  imports: [OpenaiModule],
  providers: [TranslateResolver, TranslateService],
})
export class TranslateModule {}
