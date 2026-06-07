"use client";

import { Message } from '@/lib/generated/prisma/client'
import moment from "moment";
import { convertToLocalDate } from '@/utils/date';

export default function MessageItem({ message }: { message: Message }) {
  const time = convertToLocalDate(message.createdAt);
  return (
    <div className='glass-card rounded-sm p-5 bg-transparent! space-y-2'>
      <div className='border-l-3 border-foreground pl-2 flex flex-col gap-2'>

        <div className='flex flex-row items-center justify-start gap-3'>
          {!message.isAuthor ? (
            <span className='text-sm font-bold uppercase tracking-wide'>anonymous</span>
          ) : (
            <span className='text-sm font-bold uppercase tracking-wide'>author</span>
          )}
          <div className='size-2 rounded-full bg-foreground' />
          <span className='text-sm text-muted-foreground'>{moment(time).startOf('minute').fromNow()}</span>
        </div>

        <p className="text-sm italic text-muted-foreground">"{message.message}"</p>

      </div>
    </div>
  )
}
