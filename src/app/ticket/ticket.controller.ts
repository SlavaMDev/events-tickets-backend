import { Controller, Get, Query } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { Ticket } from './ticket.types';

@Controller('tickets')
export class TicketController {
    constructor(private readonly ticketService: TicketService) {}

    @Get()
    async findAll(
      @Query('userType') userType: string,
      @Query('page') page: number,
      @Query('query') query: string,
    ): Promise<{ tickets: Partial<Ticket[]>, page: number, pages: number}> {
        return this.ticketService.findAll(userType, page, query);
    }
}
