"use client";

import { AnimatePresence, motion } from "motion/react";
import { format, isSameDay } from "date-fns";
import { useCalenderStore } from "@/store/use-calendar-store";
import { cn } from "@/lib/utils";
import { useCallback } from "react";

export function CalendarBody() {
    const {
        currentWeek,
        events,
        moveEvent,
    } = useCalenderStore();

    const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.currentTarget.classList.add('bg-card');
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.currentTarget.classList.remove('bg-card');
    }, []);

    const handleDrop = useCallback(
        (e: React.DragEvent<HTMLDivElement>, day: Date) => {
            e.preventDefault();
            e.currentTarget.classList.remove('bg-card');
            const eventId = e.dataTransfer.getData('eventId');
            moveEvent(eventId, day);
            
        },
        [moveEvent]
    );


    return (
        <div className="flex-1 border snap-x snap-mandatory overflow-x-auto scroll-smooth md:grid md:grid-cols-7">
            {currentWeek.map(day => {
                const dayEvents = events.filter(
                    event => isSameDay(event.date, day)
                );

                return (
                    <div
                        key={`DAY_${format(day, "dd-MM-yyyy")}`}
                        className="relative h-full w-full flex flex-col py-4 px-2 shrink-0 snap-start md:w-auto border-x border-b"
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={e => handleDrop(e, day)}
                    >
                        <AnimatePresence>
                            {dayEvents.map(event => (
                                <motion.div 
                                key={`DAY_${format(day, "dd-MM-yyyy")}_${event.id}`} 
                                className={cn("relative p-4 pt-6 my-2 rounded-[4px] bg-card border font-semibold cursor-grab")}
                                layoutId={`event-${event.id}`}
                                draggable
                                whileHover={{ scale: 1.02 }}
                                initial={{ opacity: 1, scale:1 }}
                                onDragStart={(e) => {
                                    e.dataTransfer.setData('eventId', event.id.toString());
                                }}
                                onDrag={(e) => {}}
                            >
                                <div className="w-3 h-3 absolute top-2 right-2 rounded-[4px] shadow-xl z-10" style={{background: event.color}}/>
                                    {event.title}
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                );
            })}
        </div>
    )
}