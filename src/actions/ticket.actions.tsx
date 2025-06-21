'use server';
import * as Sentry from '@sentry/nextjs'
import { prisma } from '@/db/prisma';
import { revalidatePath } from 'next/cache';
import { logEvent } from '@/utils/sentry';

export async function createTicket(
  prevState: { success: boolean; message: string}, 
  formDate: FormData
): Promise<{success: boolean; message: string}>{
  try{
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
      data: {subject, description, priority}
    });

    logEvent(
      `Ticket created successfully: ${ticket.id}`, 
      'ticket', 
      {ticketId: ticket.id },
      'info'
    );



    revalidatePath('/tickets');

    return { success: true, message: 'Ticket created successfully' };   
  }catch(error){
    logEvent(
      'Error creating ticket', 
      'ticket',
      { formData: Object.fromEntries(formDate.entries()), error }, 'error', 
      error
    );

    return { success: false, message: 'An error occured while created the ticket.' };    
  }
}