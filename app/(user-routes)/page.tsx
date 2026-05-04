'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { dehydrate, useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import GreetingBlock from '@/components/GreetingBlock/GreetingBlock';
import StatusBlock from '@/components/StatusBlock/StatusBlock';
import BabyTodayCard from '@/components/BabyTodayCard/BabyTodayCard';
import MomTipCard from '@/components/MomTipCard/MomTipCard';
import TasksReminderCard from '@/components/TasksReminderCard/TasksReminderCard';
import FeelingCheckCard from '@/components/FeelingCheckCard/FeelingCheckCard';
import type { Task }  from '@/types/types';
import AddTaskModal from "@/components/AddTaskModal/AddTaskModal";
import { updateTask, getTasks } from '@/lib/api/clientApi';


import { logout } from '@/lib/api/clientApi';

export default function Home() {
  const queryClient = useQueryClient();
  const isAuthenticated = true;

    // 🔽 GET tasks
  const { data: tasks = [] } = useQuery<Task[]>({
    queryKey: ['tasks'],
    queryFn: getTasks,
  });


  const mutation = useMutation({
  mutationFn: (taskId: string) => updateTask(taskId),

  onMutate: async (taskId) => {
    await queryClient.cancelQueries({ queryKey: ['tasks'] });
    const previousTasks = queryClient.getQueryData<Task[]>(['tasks']);
    queryClient.setQueryData<Task[]>(['tasks'], (old = []) =>
      old.map((task) =>
        task._id === taskId
          ? { ...task, isDone: !task.isDone } // 👈 toggle локально
          : task
      )
    );

    return { previousTasks };
  },

  onError: (_err, _taskId, context) => {
    if (context?.previousTasks) {
      queryClient.setQueryData(['tasks'], context.previousTasks);
    }
  },

  onSettled: () => {
    queryClient.invalidateQueries({ queryKey: ['tasks'] });
  },
  });

const handleToggleTask = (id: string) => {
  mutation.mutate(id);
};
  //AddTaskModal
  const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpenModal = () => {
    setIsModalOpen(true);
    };
    const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <GreetingBlock />
      <StatusBlock />
      {/* <BabyTodayCard />
      <MomTipCard /> */}
      <TasksReminderCard tasks={tasks}
      isAuthenticated={isAuthenticated}
      onToggleTask={handleToggleTask}
      onOpenModal={handleOpenModal}
      />
      {isModalOpen && (
        <AddTaskModal onClose={handleCloseModal}/>
      )}
      <FeelingCheckCard />
      <button type="button" onClick={logout}>
        Logout test
      </button>
    </div>
  );
}
