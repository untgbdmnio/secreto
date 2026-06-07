"use client";

import * as React from 'react'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Message } from '@/lib/generated/prisma/client';
import moment from 'moment'
import { convertToLocalDate } from '@/utils/date';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from 'sonner';
import { createMessageReply } from '@/actions/message-action';

interface Props {
  isOpen: boolean;
  onOpenChange: () => void;
  onSuccess: () => void;
  data: Message | null
}
export default function CommentMessageDrawer({
  isOpen,
  onOpenChange,
  data,
  onSuccess,
}: Props) {
  const mobile = useIsMobile();
  const time = convertToLocalDate(data?.createdAt);

  const [message, setMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const submitData = () => {
    if (message.length <= 0)
      return toast.error("Failed to post a comment!", { description: "You haven't written any comments yet!" });

    setLoading(true);

    setTimeout(async () => {
      const response = await createMessageReply({ message: message, parentId: data?.id!, private: false });
      if (response.success) {
        setMessage("");
        onSuccess();
        setLoading(false)
      }
    }, 1000);
  }

  return (
    <Drawer open={isOpen} direction={mobile ? 'bottom' : 'right'} onOpenChange={onOpenChange}>
      <DrawerContent className='p-2! px-3!'>
        <DrawerHeader className=''>
          <DrawerTitle>Leave a comment!</DrawerTitle>
        </DrawerHeader>
        <div className='w-full px-3 gap-3 flex flex-col mb-5'>
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
            <span className='text-xs text-muted-foreground'>{moment(time).startOf('minute').fromNow()}</span>
          </div>
        </div>
        <DrawerFooter className=''>
          <div className='relative'>
            <Textarea
              placeholder='You can type a comment for this message here...'
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              className='grow h-full min-h-45 md:min-h-60 text-sm'
            />
            <span className='absolute right-2 bottom-2 uppercase text-xs text-muted-foreground'>{message.length} characters</span>
          </div>
          <Button
            disabled={loading}
            onClick={submitData}
            className=''>
            {loading
              ? 'Please wait...'
              : 'Send a comment!'}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
