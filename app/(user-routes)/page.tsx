'use client';
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import GreetingBlock from '@/components/GreetingBlock/GreetingBlock';
import StatusBlock from '@/components/StatusBlock/StatusBlock';
import BabyTodayCard from '@/components/BabyTodayCard/BabyTodayCard';
import MomTipCard from '@/components/MomTipCard/MomTipCard';
import TasksReminderCard from '@/components/TasksReminderCard/TasksReminderCard';
import FeelingCheckCard from '@/components/FeelingCheckCard/FeelingCheckCard';
import type { Task }  from '@/types/types';
import AddTaskModal from "@/components/AddTaskModal/AddTaskModal";
import { updateTask, getTasks } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';



import { logout } from '@/lib/api/clientApi';

export default function Home() {

  return (
    <div>
      <GreetingBlock />
      <StatusBlock />
      {/* <BabyTodayCard />
      <MomTipCard /> */}
      <TasksReminderCard/>
      <FeelingCheckCard />
      <button type="button" onClick={logout}>
        Logout test
      </button>
    </div>
  );
}
