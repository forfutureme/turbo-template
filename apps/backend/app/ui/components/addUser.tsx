/**
 * Author: huweijian
 * Date: 2024-05-24 12:06:27
 * Desc: 创建用户
 */
import type { ReactNode } from 'react';
import { actionToAddUser } from '@/app/model/actions.user';
function BoxRender({
  children,
}: Readonly<{ children: ReactNode }>): JSX.Element {
  return (
    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
      {children}
    </div>
  );
}
export default function AddUser(): JSX.Element {
  return (
    <form action={actionToAddUser} className="w-1/2 bg-white p-5">
      <div className="space-y-12">
        <BoxRender>
          <div className="sm:col-span-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              用户名<i className="pl-1 text-red-600">*</i>
            </label>
            <div className="mt-2 flex">
              <input
                className="block h-8 w-5/6 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                type="text"
                name="name"
                id="name"
                placeholder="输入用户名"
                // required
                maxLength={10}
                minLength={2}
              />
            </div>
          </div>
        </BoxRender>
        <BoxRender>
          <div className="sm:col-span-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              邮箱
            </label>
            <div className="mt-2 flex">
              <input
                className="block h-8 w-5/6 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                type="text"
                name="email"
                id="email"
                placeholder="输入邮箱地址"
                // required
                maxLength={10}
                minLength={2}
              />
            </div>
          </div>
        </BoxRender>
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          保存
        </button>
      </div>
    </form>
  );
}
