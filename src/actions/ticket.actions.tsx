'use server';
import * as Sentry from '@sentry/nextjs'
import { prisma } from '@/db/prisma';
import { revalidatePath } from 'next/cache';
import { logEvent } from '@/utils/sentry';
import { getCurrentUser } from '@/lib/current-user';

export async function createTicket(
  prevState: { success: boolean; message: string}, 
  formDate: FormData
): Promise<{success: boolean; message: string}>{
  try{
    const user = await getCurrentUser();
    if (!user) {
      logEvent('User not authenticated', 'ticket', {}, 'warning');
      return { success: false, message: 'You must be logged in to create a ticket.' };
    }



    const subject = formDate.get('subject') as string
    const description = formDate.get('description') as string
    const priority = formDate.get('priority') as string

    if (!subject || !description || !priority) {
      logEvent('Validation error: All fields are required', 'ticket', {
        subject, description, priority
      }, 'warning');
      return { success: false, message: 'All fields are required.' };
    }

    // Create the ticket in the database
    const ticket = await prisma.ticket.create({
      data: {subject, description, priority, User: {
        connect: { id: user.id  }
      } }
    });

    logEvent(
      `Ticket created successfully: ${ticket.id}`, 
      'ticket', 
      {ticketId: ticket.id },
      'info'
    );


    revalidatePath('/tickets');

    return { 
      success: true, message: 'Ticket created successfully' };   
  }catch(error){
    logEvent(
      'Error creating ticket', 
      'ticket',
      { 
        formData: Object.fromEntries(formDate.entries()), 
        error 
      }, 
        'error', 
      error
    );

    return { 
      success: false, 
      message: 'An error occured while created the ticket.' 
    };    
  }
}

export async function getTickets(){
  try {
    const tickets = await prisma.ticket.findMany({
      orderBy: { createdAt: 'desc'}});
    
    logEvent('Fetched tickets successfully', 'ticket', { count: tickets.length }, 'info');
    return tickets;

  } catch(error) {
    logEvent(
      'Error fetching tickets', 
      'ticket', 
      {}, 
      'error', 
      error
    );
    Sentry.captureException(error);
    return [];
  }
}

export async function getTicketById(id: string) {
  try {
    const ticket = await prisma.ticket.findUnique({
      where: { id: Number(id) }
    });

    if (!ticket) {
      logEvent('Ticket not found', 'ticket', { ticketId: id }, 'warning');
      return null;
    }

    logEvent('Fetched ticket successfully', 'ticket', { ticketId: id }, 'info');
    return ticket;

  } catch (error) {
    logEvent(
      'Error fetching ticket by ID',
      'ticket',
      { ticketId: id },
      'error',
      error
    );
    return null;
  }
}