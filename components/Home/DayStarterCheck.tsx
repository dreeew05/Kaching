import { getStartDayStatus } from '../DatabaseUtils/FetchInstructions/GetStartDayStatus';
import DayStarter from './DayStarter';

export default function DayStarterCheck() {
  const hasStartDay: boolean = getStartDayStatus();
  return <DayStarter isStartDay={hasStartDay} />;
}
