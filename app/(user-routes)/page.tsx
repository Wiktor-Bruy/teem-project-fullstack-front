'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import GreetingBlock from '@/components/GreetingBlock/GreetingBlock';
import StatusBlock from '@/components/StatusBlock/StatusBlock';
import BabyTodayCard from '@/components/BabyTodayCard/BabyTodayCard';
import MomTipCard from '@/components/MomTipCard/MomTipCard';
import TasksReminderCard from '@/components/TasksReminderCard/TasksReminderCard';
import FeelingCheckCard from '@/components/FeelingCheckCard/FeelingCheckCard';
import AddTaskModal from '@components/AddTaskModal/AddTaskModal';
// import AddTaskForm from '@/components/AddTaskForm';


import { logout } from '@/lib/api/clientApi';

export default function Home() {
  const queryClient = useQueryClient();
  const isAuthenticated = true;
  
  return (
    <div>
      <GreetingBlock />
      <StatusBlock />
      <BabyTodayCard />
      <MomTipCard />
      <TasksReminderCard tasks={tasks}/>
      <FeelingCheckCard />
      <button type="button" onClick={logout}>
        Logout test
      </button>
    </div>
  );
}
