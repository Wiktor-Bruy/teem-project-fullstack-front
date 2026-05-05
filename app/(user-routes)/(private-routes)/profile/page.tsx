import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';

import { getMe } from '@/lib/api/serverApi';
import ProfileClient from './Profile.client';

export default async function Profile() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['user'],
    queryFn: () => getMe(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProfileClient />
    </HydrationBoundary>
  );
}
