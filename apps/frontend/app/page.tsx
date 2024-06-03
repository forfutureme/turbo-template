import { Suspense } from 'react';
import UserList, { UserListSkeleton } from '@/app/ui/components/userList';
import UserInfo from '@/app/ui/components/userInfo';

export default function Page({
  searchParams = {},
}: Readonly<{
  searchParams: { id?: string };
}>): JSX.Element {
  return (
    <main className="min-h-screen w-full bg-slate-100">
      <div className="min-h-screen w-full">
        <h1 className="w-full text-center font-bold">
          hello turbo nextjs11122
        </h1>
        <div className="min-h-60">
          <Suspense fallback={<UserListSkeleton />}>
            <UserList />
          </Suspense>
        </div>
        <div className="flex justify-center">
          {searchParams.id ? <UserInfo id={searchParams.id} /> : null}
        </div>
      </div>
    </main>
  );
}
