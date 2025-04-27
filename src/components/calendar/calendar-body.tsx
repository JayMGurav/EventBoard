"use client";

import { AnimatePresence } from "motion/react";
import { format, isSameDay } from "date-fns";
import { useCalenderStore } from "@/store/use-calendar-store";
import { useCallback } from "react";
import { EventDetailDialog } from "../event/event-detail-dialog";
import { toast } from "sonner";

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
            toast("Event has been updated!", {
                description: `${format(day, "EEEE, MMMM dd, yyyy 'at' h:mm a")}`,
            })
        },
        [moveEvent]
    );


    return (
        <div className="flex flex-1 snap-x snap-mandatory overflow-x-auto scroll-smooth md:grid md:grid-cols-7">
            {currentWeek.map(day => {
                const dayEvents = events.filter(
                    event => isSameDay(event.date, day)
                );

                return (
                    <div
                        key={`DAY_${format(day, "dd-MM-yyyy")}`}
                        id={`DAY_${format(day, "dd-MM-yyyy")}`}
                        className="relative h-full w-full flex flex-col py-4 px-2 shrink-0 snap-start md:w-auto border-x border-b"
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={e => handleDrop(e, day)}
                    >
                        <AnimatePresence>
                            {dayEvents.map(event => (
                                <EventDetailDialog key={`DAY_${format(day, "dd-MM-yyyy")}_${event.id}`}  event={event}/>
                            ))}
                        </AnimatePresence>
                    </div>
                );
            })}
        </div>
    )
}