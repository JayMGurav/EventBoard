import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContent,
  MorphingDialogTitle,
  MorphingDialogImage,
  MorphingDialogSubtitle,
  MorphingDialogClose,
  MorphingDialogContainer,
} from '@/components/ui/morphing-dialog';
import { cn } from "@/lib/utils";
import Image from "next/image";
import { format } from "date-fns";
import { EventInterface } from '@/types';

export function EventDetailDialog({ event }: { event: EventInterface }) {
  return (
    <MorphingDialog
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 24,
      }}
    >
      <MorphingDialogTrigger>
        <div
          className={cn("relative my-2 rounded-[4px] bg-card border cursor-grab flex items-center flex-wrap spaxe-x-3 p-2 gap-3 select-none")}
          draggable
          onDragStart={(e: React.DragEvent<HTMLDivElement>) => {
            e.dataTransfer.setData('eventId', event.id.toString());
          }}
        >
          <Image
            src={event.imageUrl}
            alt={event.title}
            className='w-full h-30 min-w-10 object-cover object-top shadow-2xl select-none pointer-events-none'
            style={{
              borderRadius: '4px',
            }}
            width={20}
            height={30}
            sizes="50px"

          />
          <div className='flex flex-col items-start text-left justify-center space-y-0 min-w-20'>
            <h3 className='text-[10px] font-medium sm:text-xs'>
              {event.title}
            </h3>
            <span className='text-[10px] sm:text-xs text-muted-foreground'>
              {format(event.date, "h:mm aaa")}
            </span>
          </div>
        </div>
      </MorphingDialogTrigger>
      <MorphingDialogContainer>
        <MorphingDialogContent
          className='relative h-auto w-xs md:w-lg border rounded-[14px] bg-card'
        >
          <div className='relative p-6'>
            <div className='flex justify-center py-10 h-[300px] md:h-[400px] md:max-w-lg'>
              <MorphingDialogImage
                src={event.imageUrl}
                alt={event.title}
                className='h-sm md:w-lg rounded-[8px]'
              />
            </div>
            <div className=''>
              <MorphingDialogTitle className='font-medium'>
                {event.title}
              </MorphingDialogTitle>
              <MorphingDialogSubtitle className='font-light text-muted-foreground'>
                {format(event.date, "h:mm aaa")}
              </MorphingDialogSubtitle>
              <div className='mt-4 text-sm'>
                <p>
                  {event.description}
                </p>
              </div>
            </div>
          </div>
          <MorphingDialogClose className='h-4 w-4' />
        </MorphingDialogContent>
      </MorphingDialogContainer>
    </MorphingDialog>
  );
}
