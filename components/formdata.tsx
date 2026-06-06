"use client";

import { Textarea } from '@/components/ui/textarea'
import * as React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MdOutlinePublic, MdOutlinePublicOff } from "react-icons/md";
import { GrLock, GrUnlock } from "react-icons/gr";

export default function FormData() {
  const [state, setState] = React.useState({
    message: '',
    mode: 'private',
  });

  return (
    <div className='w-full flex flex-col space-y-5'>

      <div className='flex flex-col space-y-1'>
        <h1 className='text-2xl font-bold tracking-wider text-start md:text-center'>Honest Echoes.</h1>
        <span className='text-sm text-muted-foreground text-start md:text-center'>Unburden your mind by sharing what you’ve been keeping inside. Choose to spark an open conversation on the global wall or slip a quiet, private whisper into the owner's inbox.</span>
      </div>

      <div className='flex flex-col space-y-3'>
        {/* TextArea */}
        <div className='relative w-full h-full'>
          <Textarea
            placeholder='You can type your message here...'
            className='text-sm rounded-sm h-70 md:h-30 glass-card bg-transparent!'
            value={state.message}
            onChange={(e) => setState(prev => ({ ...prev, message: e.target.value }))}
          />
          <span className='absolute bottom-2 right-2 text-xs text-muted-foreground uppercase'>{state.message.length} character</span>
        </div>

        {/* Tab */}
        <Tabs defaultValue={state.mode} onValueChange={(e) => setState(prev => ({ ...prev, mode: e }))} className="w-full">
          <TabsList className='w-full rounded-sm glass-card bg-transparent!'>
            <TabsTrigger value="private" className='rounded-sm cursor-pointer'>
              {state.mode === 'private' ? <GrLock /> : <GrUnlock />}
              Private
            </TabsTrigger>
            <TabsTrigger value="public" className='rounded-sm cursor-pointer'>
              {state.mode === 'public' ? <MdOutlinePublic /> : <MdOutlinePublicOff />}
              Public
            </TabsTrigger>
          </TabsList>
          <TabsContent value="private" className='text-start md:text-center'>
            Your message will be sent as a private whisper directly to the owner's inbox. Only they can read it, and your identity remains securely locked.
          </TabsContent>
          <TabsContent value="public" className='text-start md:text-center'>
            Your message will be displayed on the public feed. Everyone can read and openly interact with your story
          </TabsContent>
        </Tabs>

      </div>
    </div>
  )
}
