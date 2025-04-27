import { scheduledEvents } from '@/data/event';
import { getCurrentWeekDates, getNextWeekDates, getPreviousWeekDates, getWeekDates } from '@/lib/utils';
import { CalendarState } from '@/types';
import { addDays } from 'date-fns';
import { create } from 'zustand';


export const useCalenderStore = create<CalendarState>((set) => ({
    // --- state ---
    events: Object.values(scheduledEvents).flat(),
    currentDate: new Date(),
    currentWeek: getCurrentWeekDates(),
    activeDragEventId: null,
    dragPosition: {x:0, y:0},

    // --- setters ---
    setCurrentDate: (date) => set({ 
        currentDate: date,
        currentWeek: getWeekDates(date)
    }),
    setActiveDragEventId: (id) => set({ activeDragEventId: id }),
    setDragPosition: (dragPosition) => set({dragPosition}),
    goToNextDay: () => set((state) => ({ currentDate: addDays(state.currentDate, 1) })),
    goToPrevDay: () => set((state) => ({ currentDate: addDays(state.currentDate, -1) })),
    goToNextWeek: () => set((state) => {
        const nextWeek = getNextWeekDates(state.currentDate);
        return { 
          currentWeek: nextWeek,
          currentDate: nextWeek[0]
        }
      }), 
      goToPrevWeek: () => set((state) => {
        const prevWeek = getPreviousWeekDates(state.currentDate);
        return { 
          currentWeek: prevWeek,
          currentDate: prevWeek[0]
        }
      }),
      moveEvent: (eventId, newDate) => set(({events:currentEvents}) => ({
        events: currentEvents.map(event => {
            if(event.id === eventId){
                const originalEventDate = new Date(event.date);
                const updatedEventDate = new Date(newDate);

                // update with new date but same hours
                updatedEventDate.setUTCHours(
                    originalEventDate.getUTCHours(),
                    originalEventDate.getUTCMinutes(),
                    originalEventDate.getUTCSeconds(),
                    originalEventDate.getUTCMilliseconds()
                );

                return {
                    ...event,
                    date: updatedEventDate
                }
            } else {
                return event;
            }
        }),
        activeDragEventId: null
      })),
}));