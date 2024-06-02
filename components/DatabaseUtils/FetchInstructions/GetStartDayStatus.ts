import { useMemo, useState } from 'react';
import { getDatabase } from '../OpenDatabase';
import { useSelector } from 'react-redux';
import { selectStartDayTrigger } from '../../../redux/GlobalStateRedux/GlobalStateSelectors';

export const getStartDayStatus = () => {
  const [startDayStatus, setStarDayStatus] = useState<boolean>(false);

  const db = getDatabase();
  const trigger = useSelector(selectStartDayTrigger);

  const _getStartDayStatus = async () => {
    const readOnly = true;
    setStarDayStatus(false);
    await db.transactionAsync(async (tx) => {
      const result = await tx.executeSqlAsync(
        `SELECT count(*) AS count FROM eods WHERE eods.iscurrent = 1`,
      );
      //   setStarDayStatus(result.rows[0].is_start_day);
      console.log('Count: ' + result);
      console.log('Redux: ' + trigger);
      const count = result.rows[0]['count'];
      if (count > 0) {
        setStarDayStatus(true);
      }
    }, readOnly);
  };

  useMemo(() => {
    _getStartDayStatus();
  }, [trigger]);

  return startDayStatus;
};
