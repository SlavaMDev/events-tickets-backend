import { Injectable } from '@nestjs/common';
import { Ticket } from './ticket.types';
import { UserType } from '../user/user.types';
import { ConfigService } from '@nestjs/config';
import { readFile } from 'fs/promises';

@Injectable()
export class TicketService {
    private readonly filePath: string;
    constructor(private configService: ConfigService) {
        this.filePath = `${this.configService.get<string>('TICKETS_DATA_FILE')}`;
    }

    async findAll(
      userType: string,
      page: number = 1,
      query: string = ''
    ): Promise<{ tickets: Partial<Ticket[]>, page: number, pages: number }> {
        const data: string = await readFile(this.filePath, { encoding: 'utf8' });
        const tickets = JSON.parse(data);
        const pageSize = 10;
        const count = tickets.length - 1;
        let totalPages = Math.ceil(count / pageSize);
        const skip = (page - 1) * pageSize;
        const regex = new RegExp(query, 'i');
        const filteredTickets = tickets.filter((ticket: Ticket) =>
          regex.test(ticket.title) ||
          regex.test(ticket.description)
        );

        if (userType === UserType.Tourist) {
            filteredTickets.forEach((ticket: Ticket) => {
                ticket.description = ticket.description.substring(0, ticket.description.length / 2);
            });
        } else if (userType === UserType.Local) {
            filteredTickets.forEach((ticket: Ticket) => {
                ticket.image = '';
            });
        }

        if (query.length) {
            totalPages = Math.ceil(filteredTickets.length / pageSize);
        }

        return { tickets: filteredTickets.slice(skip, skip + pageSize), page, pages: totalPages };
    }
}
