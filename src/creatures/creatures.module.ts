import { Module } from '@nestjs/common';
import { CreaturesService } from './creatures.service';
import { CreaturesController } from './creatures.controller';

@Module({
  controllers: [CreaturesController],
  providers: [CreaturesService]
})
export class CreaturesModule {}
