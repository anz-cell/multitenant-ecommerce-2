"use client";

// import { useQuery } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';
import { useQuery } from '@tanstack/react-query';

export default function Home() {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.auth.session.queryOptions());
  // const categories = useQuery(trpc.categories.getMany.queryOptions());
  return (
    <div>
      {/* <p>is loading: {`${categories.isLoading}`}</p> */}
      {JSON.stringify(data?.user, null, 2)}
      {/* // Home */}
    </div>
  );
}