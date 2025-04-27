"use client";

import { AnimatePresence } from "motion/react";
import { format, isSameDay } from "date-fns";
import { useCalenderStore } from "@/store/use-calendar-store";
import { cn } from "@/lib/utils";

export function CalendarBody() {
    const {
        currentWeek,
        activeDragEventId,
        events,
    } = useCalenderStore();

    return (
        <div className="flex-1 border snap-x snap-mandatory overflow-x-auto scroll-smooth md:grid md:grid-cols-7">
            {currentWeek.map(day => {
                const dayEvents = events.filter(
                    event => isSameDay(event.date, day) && event.id !== activeDragEventId
                );

                return (
                    <div
                        key={`DAY_${format(day, "dd-MM-yyyy")}`}
                        className="relative h-full w-full flex flex-col py-4 px-2 shrink-0 snap-start md:w-auto border-x border-b"
                    >
                        <AnimatePresence>
                            {dayEvents.map(event => (
                                <div 
                                key={event.id} 
                                className={cn("relative p-4 pt-6 my-2 rounded-[4px] bg-card border font-semibold")}
                                style={{
                                    // borderColor: event.color
                                }}
                            >
                                <div className="w-3 h-3 absolute top-2 right-2 rounded-[4px] shadow-xl z-10" style={{background: event.color}}/>
                                    {event.title}
                                </div>
                            ))}
                        </AnimatePresence>
                    </div>
                );
            })}
        </div>
    )
}