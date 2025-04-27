import { EventInterface } from "@/types";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { format } from "date-fns";

export function EventCardButton({ event }: { event: EventInterface }) {
    return (
        <motion.div
            size="lg"
            className={cn("relative my-2 rounded-[4px] bg-card border cursor-grab flex items-center spaxe-x-3 p-2 gap-3")}
            layoutId={`event-${event.id}`}
            draggable
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 1, scale: 1 }}
            onDragStart={(e) => {
                e.dataTransfer.setData('eventId', event.id.toString());
            }}
            onDrag={(e) => { }}
        >
            <Image
                src={event.imageUrl}
                alt={event.title}
                className='w-10 h-10 object-cover object-top shadow-2xl'
                style={{
                    borderRadius: '4px',
                }}
                width={10}
                height={10}
                sizes="50px"

            />
            <div className='flex flex-col items-start justify-center space-y-0'>
                <h3 className='text-[10px] font-medium sm:text-xs'>
                    {event.title}
                </h3>
                <span className='text-[10px] sm:text-xs text-muted-foreground'>
                    {format(event.date, "h:mm aaa")}
                </span>
            </div>
        </motion.div>
    )
}