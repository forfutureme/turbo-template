import { Suspense } from 'react';
import AddUser from '@/app/ui/components/addUser';
import UserList, { UserListSkeleton } from '@/app/ui/components/userList';

export default function Page(): JSX.Element {
  return (
    <main className="min-h-screen w-full bg-slate-100">
      <div className="min-h-screen w-full">
        <h1 className="w-full text-center font-bold">hello backend</h1>
        <div className="flex justify-center">
          <AddUser />
        </div>
        <div className="min-h-60">
          <Suspense fallback={<UserListSkeleton />}>
            <UserList />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
