export interface EventInterface {
    id: string;
    title: string;
    description: string;
    date: string | Date;
    imageUrl?: string;
    color?: string;
}
  
  
export interface EventsByDateInterface {
[date: string]: EventInterface[];
}

export interface CalendarState {
    events: EventInterface[];
    currentDate: Date; // Focus date (day for mobile, start of week for desktop)
    currentWeek: Date[];
    activeDragEventId: string | null;
    dragPosition: {x:number; y:number};
    setCurrentDate: (date: Date) => void;
    setActiveDragEventId: (id: string | null) => void;
    moveEvent: (eventId: string, newDate: Date) => void;
    setDragPosition: (dragPosition:{x: number; y:number}) => void;
    goToNextDay: () => void;
    goToPrevDay: () => void;
    goToNextWeek: () => void;
    goToPrevWeek: () => void;
}