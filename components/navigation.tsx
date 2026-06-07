"use client";

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BsFillCloudMoonFill, BsCloudSunFill } from "react-icons/bs";

const MenuItem = [
  { path: '/', label: 'Whisper' },
  { path: '/messages', label: 'Feed' },
]

export default function Navigation() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className='flex flex-row items-center justify-between sticky backdrop-blur-lg bottom-3 bg-transparent! px-3! rounded-full w-full max-w-3xl mx-auto glass-card'>
      <div className='flex flex-row gap-3 items-center'>
        <div className='text-sm font-black uppercase tracking-widest'>secreto</div>
        <div className='size-1.5 rounded-full bg-foreground' />
        <div className='flex flex-row gap-3 items-center'>
          {MenuItem.map((item, index) => {
            return (
              <Link className='text-xs font-normal uppercase tracking-widest' href={item.path} key={index}>
                {item.label}
              </Link>
            )
          })}
        </div>
      </div>

      <Button
        onClick={toggleTheme}
        variant="ghost"
        size="icon-lg"
        className='relative overflow-visible group cursor-pointer'
      >
        {theme === 'dark' ? (
          <BsFillCloudMoonFill className='text-white z-10 size-6 relative drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]' />
        ) : (
          <BsCloudSunFill className='text-white z-10 size-6 relative drop-shadow-[0_0_20px_rgba(234,179,8,0.5)]' />
        )}

        <div
          className={cn(
            "absolute inset-0 m-auto size-50 rounded-full blur-xl opacity-70 transition-all duration-300 pointer-events-none z-0",
            theme === 'dark' ? 'bg-blue-700 shadow-[0_0_20px_#3b82f6]' : 'bg-yellow-500 shadow-[0_0_20px_#eab308]',
            "group-hover:scale-125 group-hover:opacity-100"
          )}
        />
      </Button>
    </div>
  );
}