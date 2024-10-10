import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { OrderEntity } from './entities/order.entity';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Create order' })
  @ApiCreatedResponse({ type: OrderEntity })
  async create(@Body() createOrderDto: CreateOrderDto): Promise<OrderEntity> {
    return new OrderEntity(await this.ordersService.create(createOrderDto));
  }

  @Get()
  @ApiOperation({ summary: 'List order' })
  @ApiCreatedResponse({ type: OrderEntity })
  async findAll(): Promise<OrderEntity[]> {
    const orders = await this.ordersService.findAll();
    return orders.map((order) => new OrderEntity(order));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get order by id' })
  @ApiCreatedResponse({ type: OrderEntity })
  async findOne(@Param('id') id: string): Promise<OrderEntity> {
    return new OrderEntity(await this.ordersService.findOne(+id));
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Get order by id' })
  @ApiCreatedResponse({ type: OrderEntity })
  async update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ): Promise<OrderEntity> {
    return new OrderEntity(
      await this.ordersService.update(+id, updateOrderDto),
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete order by id' })
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    await this.ordersService.remove(+id);
  }

  @Post(':orderId/add/:itemId')
  async addItemToOrder(
    @Param('orderId', ParseIntPipe) orderId: number,
    @Param('itemId', ParseIntPipe) itemId: number,
  ): Promise<OrderEntity> {
    return new OrderEntity(
      await this.ordersService.addItemToOrder(orderId, itemId),
    );
  }

  @Delete(':orderId/remove/:itemId')
  async removeItemFromOrder(
    @Param('orderId', ParseIntPipe) orderId: number,
    @Param('itemId', ParseIntPipe) itemId: number,
  ): Promise<OrderEntity> {
    return new OrderEntity(
      await this.ordersService.removeItemFromOrder(orderId, itemId),
    );
  }
}
