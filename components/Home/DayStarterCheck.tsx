import { getStartDayStatus } from '../DatabaseUtils/FetchInstructions/GetStartDayStatus';
import DayStarter from './DayStarter';

export default function DayStarterCheck() {
  const hasStartDay: boolean = getStartDayStatus();
  console.log('To Start Day: ', hasStartDay);
  return <DayStarter isStartDay={hasStartDay} />;
}
