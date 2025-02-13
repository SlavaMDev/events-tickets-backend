import { Controller, Get, Post, Body, UseGuards, Query } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { Ticket } from './schema/ticket.schema';
import { JwtAuthGuard } from '../jwt/jwt.guard';

@Controller('tickets')
export class TicketController {
    constructor(private readonly ticketService: TicketService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    async create(@Body() createTicketDto: Partial<Ticket>) {
        return this.ticketService.createTicket(createTicketDto);
    }

    @Get()
    async findAll(
      @Query('userType') userType: string,
      @Query('page') page: number,
      @Query('query') query: string,
    ): Promise<{ tickets: Partial<Ticket[]>, page: number, pages: number}> {
        return this.ticketService.findAll(userType, page, query);
    }
}
