"use client";

import * as React from 'react'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { Message } from '@/lib/generated/prisma/client';
import { useIsMobile } from '@/hooks/use-mobile';
import { getComments } from '@/actions/message-action';
import { timeAgo } from '@/utils/date';

interface Props {
  isOpen: boolean;
  onOpenChange: () => void;
  data: Message | null
}
export default function ListAllComment({
  isOpen,
  onOpenChange,
  data,
}: Props) {
  const mobile = useIsMobile();
  const [allComments, setAllComments] = React.useState<Message[]>([]);

  const fetchComments = React.useCallback(async () => {
    const response = await getComments(data?.id!);
    if (response.success) {
      const [data] = response.data;
      setAllComments(data.replies);
    }
  }, [isOpen])

  React.useEffect(() => {
    if (isOpen) fetchComments()
  }, [fetchComments]);

  return (
    <Drawer open={isOpen} direction={mobile ? 'bottom' : 'right'} onOpenChange={onOpenChange}>
      <DrawerContent className='p-2! px-3! h-full max-h-[90vh] md:max-h-screen flex flex-col'>
        <DrawerHeader className="shrink-0">
          <DrawerTitle>List all comments!</DrawerTitle>
        </DrawerHeader>

        <div className='w-full px-3 gap-3 flex flex-col shrink-0'>
          <p className="italic text-sm text-muted-foreground">
            "{data?.message}"
          </p>
          <div className='flex flex-row items-center justify-start gap-3'>
            {!data?.isAuthor ? (
              <span className='text-sm font-bold uppercase tracking-wide'>anonymous</span>
            ) : (
              <span className='text-sm font-bold uppercase tracking-wide'>author</span>
            )}
            <div className='size-1.5 rounded-full bg-foreground' />
            <span className='text-xs text-muted-foreground'>{timeAgo(data?.createdAt!)}</span>
          </div>
        </div>

        <div className='px-3 mt-3 flex-1 flex flex-col overflow-hidden'>
          <h1 className="font-semibold mb-2 shrink-0">Comments</h1>

          <div className='flex-1 overflow-y-auto no-scrollbar pb-4'>
            {allComments && allComments.length > 0 ? (
              allComments.map((item, index) => (
                <div key={index} className='my-2 rounded-sm p-2 bg-transparent! space-y-2'>
                  <div className='border-l-3 border-foreground pl-2 flex flex-col gap-2'>
                    <div className='flex flex-row items-center justify-start gap-3'>
                      {!item.isAuthor ? (
                        <span className='text-sm font-semibold capitalize tracking-wide'>anonymous</span>
                      ) : (
                        <span className='text-sm font-semibold capitalize tracking-wide'>author</span>
                      )}
                      <div className='size-1.5 rounded-full bg-foreground' />
                      <span className='text-xs text-muted-foreground'>{timeAgo(item?.createdAt)}</span>
                    </div>
                    <p className="text-sm italic text-muted-foreground">"{item.message}"</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground italic px-2">No comments yet.</p>
            )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
