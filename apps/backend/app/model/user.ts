import prisma from '@repo/database/client';

export async function getUserList(): Promise<
  {
    id: string;
    name: string;
    email: string | null;
  }[]
> {
  try {
    const res = await prisma.user.findMany({
      select: { id: true, name: true, email: true },
    });
    return res;
  } catch (error) {
    console.log(error);
    throw new Error('查询用户列表失败');
  }
}
