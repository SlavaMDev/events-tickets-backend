import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ticket, TicketDocument } from './schema/ticket.schema';
import { UserType } from '../user/user.types';

@Injectable()
export class TicketService {
    constructor(@InjectModel(Ticket.name) private ticketModel: Model<TicketDocument>) {}

    async createTicket(data: Partial<Ticket>): Promise<Ticket> {
        const newTicket = new this.ticketModel(data);
        return newTicket.save();
    }

    async findAll(
      userType: string,
      page: number = 1,
      query: string = ''
    ): Promise<{ tickets: Partial<Ticket[]>, page: number, pages: number }> {
        const pageSize = 10;
        const count = await this.ticketModel.countDocuments() - 1;
        const pages = Math.ceil(count / pageSize);
        let totalPages = pages;
        const skip = (page - 1) * pageSize;
        const regex = new RegExp(query, 'i');
        let tickets = await this.ticketModel.find({
              $or: [
                  { title: { $regex: regex } },
                  { description: { $regex: regex } },
              ]
          }
        ).skip(skip).limit(pageSize).exec();

        if (userType === UserType.Tourist) {
            tickets.forEach(ticket => {
                ticket.description = ticket.description.substring(0, ticket.description.length / 2);
            });
        } else if (userType === UserType.Local) {
            tickets.forEach(ticket => {
                ticket.image = '';
            });
        }

        if (query.length) {
            totalPages = Math.ceil(tickets.length / pageSize);
        }

        return { tickets, page, pages: totalPages };
    }
}
