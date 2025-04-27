"use client";

import { useCalenderStore } from "@/store/use-calendar-store";
import { cn, isSameDay } from "@/lib/utils";
import { format } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";

export function CalenderHeader() {
    const { currentDate, currentWeek, goToNextWeek, goToPrevWeek, setCurrentDate } = useCalenderStore();

    return (
        <div>
            <div className="pb-4 flex items-center gap-6 mb-4">
                <Button variant="outline" onClick={() => setCurrentDate(new Date())}>Today</Button>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={goToPrevWeek}><ChevronLeft /></Button>
                    <Button variant="outline" size="icon" onClick={goToNextWeek}><ChevronRight /></Button>
                </div>
                <div className="font-semibold text-xl">
                    {format(currentDate, "MMMM yyyy")}
                </div>
            </div>
            <div className="grid grid-cols-7 md:divide-x-1 md:border p-0">
                {currentWeek.map((day) => (
                    <Button
                        key={`${day.toString()}_header`}
                        variant="ghost"
                        className={cn("flex flex-col text-center py-10 border-b", isSameDay(currentDate, day) && "border-x border-t border-b-0 bg-card md:bg-inherit text-blue-400")}
                        onClick={() => setCurrentDate(day)}
                    >
                        <div className="text-muted-foreground">{format(day, "EE")}</div>
                        <div className="font-semibold">{format(day, "d")}</div>
                    </Button>
                ))}
            </div>
        </div>
    );
}