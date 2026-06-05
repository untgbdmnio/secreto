"use client";

import * as React from 'react'
import { TbMessageSearch } from "react-icons/tb";

export default function page() {
  const [state, setState] = React.useState({
    data: [],
    loading: false,
  });

  return (
    <div className='flex flex-col items-center justify-center w-full h-full mx-auto flex-1 max-w-3xl min-h-screen space-y-5'>

      <div className='flex flex-col space-y-1'>
        <h1 className='text-2xl font-bold tracking-wider text-start md:text-center'>Public Echoes.</h1>
        <span className='text-sm text-muted-foreground text-start md:text-center'>
          Where hidden thoughts meet the light. Explore a curated, distraction-free sanctuary of public messages, where every voice is quiet yet powerful, and every story stays completely nameless.
        </span>
      </div>

      <div className='flex flex-col items-center justify-center space-y-2 grow flex-1 h-full w-full'>
        {!state.loading && state.data.length === 0 ? (
          <div className='flex flex-col text-center items-center justify-center grow w-full flex-1'>
            <TbMessageSearch size={30} className='mb-2' />
            <h1 className='font-bold'>No messages yet.</h1>
            <span className='text-xs text-muted-foreground'>
              There are no messages yet. Add a message to be the first.
            </span>
          </div>
        ) : (
          <div></div>
        )}
      </div>

    </div>
  )
}
