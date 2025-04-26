import { Injectable } from '@nestjs/common';
import { OpenaiService } from 'src/openai/openai.service';

@Injectable()
export class TranslateService {
  constructor(private readonly openaiService: OpenaiService) {}

  async translate(text: string): Promise<string> {
    // OpenAI APIを使用してテキストを翻訳
    const translation = await this.openaiService.translateToEnglish(text);
    return translation;
  }
}
