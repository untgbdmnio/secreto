"use client";

import { getMessage } from '@/actions/message-action';
import { Message } from '@/lib/generated/prisma/client';
import * as React from 'react'
import { TbMessageSearch } from "react-icons/tb";
import moment from "moment";
import { convertToLocalDate } from '@/utils/date';
import { HiReply } from "react-icons/hi";
import { BiMessageDetail } from "react-icons/bi";
import { ScrollArea } from '@/components/ui/scroll-area';
import CommentMessageDrawer from '@/app/messages/components/message-drawer';
import ListAllComment from '@/app/messages/components/list-comment';
import { toast } from 'sonner';

interface IMessage extends Message {
  replies: Message[],
  _count: {
    replies: number
  }
}

export default function page() {
  const [state, setState] = React.useState({
    data: [] as IMessage[],
    loading: false,
    drawerOpen: false,
    commentDrawer: false,
    selectedMessage: null as IMessage | null
  });

  const fetchMessage = React.useCallback(async () => {
    const response = await getMessage();
    if (response.success) {
      setState(prev => ({
        ...prev,
        data: response.data,
        loading: false
      }));
    }
  }, []);

  React.useEffect(() => {
    fetchMessage();
  }, [fetchMessage]);

  const refreshFetching = async () => {
    await fetchMessage();
  }

  return (
    <div className='flex flex-col items-center justify-center w-full mx-auto max-w-3xl space-y-5 p-3'>

      <CommentMessageDrawer
        isOpen={state.drawerOpen}
        onOpenChange={() => setState(prev => ({ ...prev, drawerOpen: false }))}
        data={state.selectedMessage}
        onSuccess={async () => {
          toast.success("Success!", { description: "You've successfully posted a comment!" });
          await refreshFetching();
          setState(prev => ({
            ...prev,
            drawerOpen: false,
            commentDrawer: true
          }))
        }}
      />

      <ListAllComment
        isOpen={state.commentDrawer}
        onOpenChange={() => setState(prev => ({ ...prev, commentDrawer: false }))}
        data={state.selectedMessage}
      />

      <div className='flex flex-col gap-1'>
        <h1 className='text-2xl font-bold tracking-wider text-start md:text-center'>Public Echoes.</h1>
        <span className='text-sm text-muted-foreground text-start md:text-center'>
          Where hidden thoughts meet the light. Explore a curated, distraction-free sanctuary of public messages, where every voice is quiet yet powerful, and every story stays completely nameless.
        </span>
      </div>

      <div className='flex flex-col items-center justify-start space-y-2 grow flex-1 h-full w-full'>
        {!state.loading && state.data.length === 0 ? (
          <div className='flex flex-col text-center items-center justify-center grow w-full flex-1'>
            <TbMessageSearch size={30} className='mb-2' />
            <h1 className='font-bold'>No messages yet.</h1>
            <span className='text-xs text-muted-foreground'>
              There are no messages yet. Add a message to be the first.
            </span>
          </div>
        ) : (
          <ScrollArea className='w-full'>
            {state.data.map((msg, index) => {
              const time = convertToLocalDate(msg.createdAt);
              return (
                <div key={index} className='glass-card my-2 rounded-sm p-5 bg-transparent! space-y-2'>
                  <div className='border-l-3 border-foreground pl-2 flex flex-col gap-2'>

                    <div className='flex flex-row items-center justify-start gap-3'>
                      {!msg.isAuthor ? (
                        <span className='text-sm font-bold uppercase tracking-wide'>anonymous</span>
                      ) : (
                        <span className='text-sm font-bold uppercase tracking-wide'>author</span>
                      )}
                      <div className='size-1.5 rounded-full bg-foreground' />
                      <span className='text-xs text-muted-foreground'>{moment(time).startOf('minute').fromNow()}</span>
                    </div>

                    <p className="text-sm italic text-muted-foreground">"{msg.message}"</p>

                    <div className='flex flex-row items-center justify-end gap-2 mt-2 w-full'>
                      <div
                        onClick={() => setState(prev => ({ ...prev, commentDrawer: true, selectedMessage: msg }))}
                        className='flex flex-row items-center cursor-pointer hover:text-blue-500 justify-center gap-1 text-sm select-none'>
                        <BiMessageDetail />
                        <span>{msg._count.replies}</span>
                      </div>
                      <div className='size-1 rounded-full bg-foreground' />
                      <div
                        onClick={() => setState(prev => ({ ...prev, drawerOpen: true, selectedMessage: msg }))}
                        className='flex flex-row items-center justify-center gap-1 text-sm select-none cursor-pointer hover:text-blue-500 transition-colors duration-300'>
                        <HiReply />
                        <span>Reply</span>
                      </div>
                    </div>

                  </div>
                </div>
              )
            })}
          </ScrollArea>
        )}
      </div>

    </div>
  )
}
