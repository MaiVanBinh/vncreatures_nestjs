import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { CreaturesService } from './creatures.service';
import { CreateCreatureDto } from './dto/create-creature.dto';
import { UpdateCreatureDto } from './dto/update-creature.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { GetCreatureDto } from './dto/get-creature.dto';

@Controller('creatures')
export class CreaturesController {
  constructor(private readonly creaturesService: CreaturesService) {}

  @Post()
  create(@Body() createCreatureDto: CreateCreatureDto) {
    return this.creaturesService.create(createCreatureDto);
  }

  @Post('get-list')
  @UseGuards(JwtAuthGuard)
  findAll(@Body() body: GetCreatureDto) {
    return this.creaturesService.findAll(body);
  }

  @Get('red-book-by-type')
  @UseGuards(JwtAuthGuard)
  findCreatureRedBookByType(@Query() query: GetCreatureDto) {
    return this.creaturesService.findCreatureRedBookByType();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.creaturesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCreatureDto: UpdateCreatureDto,
  ) {
    return this.creaturesService.update(+id, updateCreatureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.creaturesService.remove(+id);
  }
}
