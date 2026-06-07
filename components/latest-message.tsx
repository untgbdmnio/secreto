"use client";

import { getMessage } from '@/actions/message-action';
import MessageItem from '@/components/message-item';
import { Message } from '@/lib/generated/prisma/client';
import Link from 'next/link';
import * as React from 'react';

interface Props {
  mode?: 'all' | 'hightlight',
  isMounted?: boolean;
  updateState: (key: string, value: any) => void;
}
export default function LatestMessage({ mode = 'hightlight', isMounted, updateState }: Props) {
  const [state, setState] = React.useState({
    messages: [] as Message[],
    loading: false,
    isHidden: true,
  });

  const fetchMessage = React.useCallback(async () => {

    setState(prev => ({ ...prev, loading: true }));
    setTimeout(async () => {
      const response = await getMessage();
      if (response.success) {
        setState(prev => ({
          ...prev,
          messages: response.data,
          loading: false
        }));

        updateState('isMounted', false);
      }
    }, 700);

  }, [isMounted]);

  React.useEffect(() => {
    if (isMounted) fetchMessage();
  }, [fetchMessage]);

  return (
    <div className='w-full'>

      {mode === 'hightlight' ? (
        <div className='flex flex-row items-center justify-between'>
          <h1 className='text-base font-bold uppercase'>Public Echoes</h1>
          <Link href="/messages" className='text-muted-foreground text-sm underline hover:text-blue-500 transition-colors duration-300'>See more!</Link>
        </div>
      ) : null}

      {!state.loading && state.messages.length <= 0 ? (
        <div>Kosong...</div>
      ) : (
        <div className='p-3 space-y-2'>
          {state.messages.map((item, index) => {
            return (
              <MessageItem key={index} message={item} />
            )
          })}
        </div>
      )}

    </div>
  )
}
