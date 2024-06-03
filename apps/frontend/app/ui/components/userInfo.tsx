import type { User } from '@repo/database/client';
import { getUserInfo } from '@/app/model/user';
export default async function UserInfo({
  id,
}: Readonly<{ id: string }>): Promise<JSX.Element> {
  const info = (await getUserInfo(id)) as User;
  return (
    <div className=" mt-2">
      <h5 className="font-semibold">用户详情</h5>
      <ul>
        <li>
          <span className="font-medium">ID: </span>
          <span className="text-gray-400">{info.id}</span>
        </li>
        <li>
          <span className="font-medium">姓名: </span>
          <span className="text-gray-400">{info.name}</span>
        </li>
        <li>
          <span className="font-medium">邮件: </span>
          <span className="text-gray-400">{info.email ?? '--'}</span>
        </li>
        <li>
          <span className="font-medium">创建时间: </span>
          <span className="text-gray-400">
            {new Date(info.createAt).toDateString()}
          </span>
        </li>
        <li>
          <span className="font-medium">更新时间: </span>
          <span className="text-gray-400">
            {new Date(info.updateAt).toDateString()}
          </span>
        </li>
      </ul>
    </div>
  );
}
