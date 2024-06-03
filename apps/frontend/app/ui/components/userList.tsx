import clsx from 'clsx';
import type { Key, ReactNode } from 'react';
import { getUserList } from '@/app/model/user';
import ChangeParams from './changeParams';

export interface ColumnType<T> {
  name: string;
  index: string;
  render?: (val: unknown, record: T) => React.ReactNode;
}
interface UserType {
  id: string;
  name: string;
  [key: string]: unknown;
}
export default async function UserList(): Promise<JSX.Element> {
  const users: UserType[] = (await getUserList()) as UserType[];
  const columns: ColumnType<UserType>[] = [
    { index: 'id', name: '序号' },
    { index: 'name', name: '姓名' },
    {
      index: 'op',
      name: '操作',
      render: (_, item: UserType) => {
        return <ChangeParams id={item.id} />;
      },
    },
  ];
  function TdRender(column: ColumnType<UserType>, item: UserType): ReactNode {
    const val = item[column.index];
    if (column.render) {
      return column.render(val, item);
    }
    return val as ReactNode;
  }
  return (
    <div className="m-auto mt-4 w-2/3 rounded-md bg-slate-400/20 p-2">
      <table className="hidden min-w-full text-gray-900 md:table">
        <thead className="rounded-lg text-left text-sm font-normal">
          <tr>
            {columns.map((column, index) => (
              <th
                key={column.index as Key}
                className={clsx('px-4 py-5 font-medium', {
                  'sm:pl-6': index === 0,
                })}
              >
                {column.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white">
          {users.map((item) => (
            <tr
              key={item.id}
              className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
            >
              {columns.map((column) => (
                <td
                  key={`${item.id}-${column.index}`}
                  className="whitespace-nowrap px-3 py-3"
                >
                  {TdRender(column, item)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// 以下为 骨架内容
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function UserListSkeleton(): JSX.Element {
  return (
    <div className={`${shimmer} mt-4 w-2/3 bg-white`}>
      <table className="hidden min-w-full text-gray-900 md:table">
        <thead className="rounded-lg text-left text-sm font-normal">
          {Array(2).map((_, index) => (
            <th
              key={`th-${index}`}
              className={clsx('px-4 py-5 font-medium', {
                'sm:pl-6': index === 0,
              })}
            ></th>
          ))}
        </thead>
        <tbody className="bg-white">
          {Array(3).map((_, index) => (
            <tr
              key={`tr-${index}`}
              className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
            >
              {Array(3).map((_, index) => (
                <td
                  key={`tr-td-${index}`}
                  className="whitespace-nowrap px-3 py-3"
                ></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
