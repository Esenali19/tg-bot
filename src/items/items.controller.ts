import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiCreatedResponse } from '@nestjs/swagger';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ItemEntity } from './entities/item.entity';

@ApiTags('Items')
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  @ApiOperation({ summary: 'Create item' })
  @ApiCreatedResponse({ type: ItemEntity })
  async create(@Body() createItemDto: CreateItemDto): Promise<ItemEntity> {
    return new ItemEntity(await this.itemsService.create(createItemDto));
  }

  @Get()
  @ApiOperation({ summary: 'List item' })
  @ApiCreatedResponse({ type: ItemEntity })
  async findAll(): Promise<ItemEntity[]> {
    const items = await this.itemsService.findAll();
    return items.map((item) => new ItemEntity(item));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get item by id' })
  @ApiCreatedResponse({ type: ItemEntity })
  async findOne(@Param('id') id: string): Promise<ItemEntity> {
    return new ItemEntity(await this.itemsService.findOne(+id));
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update item by id' })
  @ApiCreatedResponse({ type: ItemEntity })
  async update(
    @Param('id') id: string,
    @Body() updateItemDto: UpdateItemDto,
  ): Promise<ItemEntity> {
    return new ItemEntity(await this.itemsService.update(+id, updateItemDto));
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete item by id' })
  @HttpCode(204)
  async remove(@Param('id') id: string): Promise<void> {
    await this.itemsService.remove(+id);
  }
}
