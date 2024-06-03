import prisma from '@repo/database/client';

export async function getUserList(): Promise<
  {
    id: string;
    name: string;
  }[]
> {
  try {
    const res = await prisma.user.findMany({
      select: { id: true, name: true },
    });
    return res;
  } catch (error) {
    console.log(error);
    throw new Error('查询用户列表失败');
  }
}

export async function getUserInfo(id: string): Promise<{
  id: string;
  name: string;
  email: string | null;
  createAt: Date;
  updateAt: Date;
} | null> {
  try {
    const res = await prisma.user.findFirst({
      where: {
        id,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
    throw new Error('查询用户详情失败');
  }
}
