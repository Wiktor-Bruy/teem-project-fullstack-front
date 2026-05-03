'use client';

import GreetingBlock from '@/components/GreetingBlock/GreetingBlock';
import StatusBlock from '@/components/StatusBlock/StatusBlock';
import BabyTodayCard from '@/components/BabyTodayCard/BabyTodayCard';
import MomTipCard from '@/components/MomTipCard/MomTipCard';
import TasksReminderCard from '@/components/TasksReminderCard/TasksReminderCard';
import FeelingCheckCard from '@/components/FeelingCheckCard/FeelingCheckCard';

import { logout } from '@/lib/api/clientApi';

export default function Home() {
  return (
    <div>
      <GreetingBlock />
      <StatusBlock />
      <BabyTodayCard />
      <MomTipCard />
      <TasksReminderCard />
      <FeelingCheckCard />
      <button type="button" onClick={logout}>
        Logout test
      </button>
    </div>
  );
}
