'use server';

import type { User } from '@repo/database/client';
import prisma from '@repo/database/client';
/**
 * 查询用户列表
 * @returns `{id: sting; name:string}`
 */
export async function searchUsers(): Promise<
  {
    id: string;
    name: string;
  }[]
> {
  try {
    const res = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    return res;
  } catch (error) {
    throw new Error(
      `查询用户列表失败-${(error as { message: string }).message}`,
    );
  }
}

/**
 * 查询用户信息
 * @param id - 字符串
 * @returns - `User`｜`{}` | null
 */
export async function searchUserInfo(
  id: string,
): Promise<User | object | null> {
  if (!id) return {};
  try {
    const res = await prisma.user.findFirst({ where: { id } });
    return res;
  } catch (error) {
    console.error(error);
    throw new Error('查询用户信息失败');
  }
}

/**
 * 创建用户
 * @param name - 字符串
 * @returns - `{id: string}`
 */
export async function createUser(name: string): Promise<{ id: string }> {
  try {
    const res = await prisma.user.create({
      data: {
        name,
      },
      select: { id: true },
    });
    return res;
  } catch (error) {
    console.error(error);
    throw new Error('创建用户失败');
  }
}
