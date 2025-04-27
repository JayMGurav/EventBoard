import { CalendarBody } from "@/components/calendar/calendar-body";
import { CalenderHeader } from "@/components/calendar/calendar-header";

export default function Home() {
  return (
    <div className="h-screen p-4 flex flex-col">      
      <CalenderHeader/>
      <CalendarBody/>
    </div>
  );
}
