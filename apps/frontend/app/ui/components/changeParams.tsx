'use client';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function ChangeParams({
  id,
}: Readonly<{ id: string }>): JSX.Element {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const handelChange = (): void => {
    const params = new URLSearchParams(searchParams);

    if (id) {
      params.set('id', id);
    } else {
      params.delete('id');
    }
    router.replace(`${pathname}?${params.toString()}`);
  };
  return (
    <button
      className="rounded-sm bg-blue-400 px-2 py-1 text-white hover:bg-blue-600 hover:text-slate-100"
      onClick={() => {
        handelChange();
      }}
    >
      查看详情
    </button>
  );
}
