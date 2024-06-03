'use server';
import { revalidatePath } from 'next/cache';
import prisma from '@repo/database/client';

export async function actionToAddUser(fromData: FormData): Promise<void> {
  const name = fromData.get('name') as string;
  const email = fromData.get('email') as string;
  if (!name) return;
  try {
    await prisma.user.create({ data: { name, email } });
    revalidatePath('/');
  } catch (error) {
    console.error(error);
    throw new Error('创建用户失败');
  }
}

export async function actionToDelUser(id: string): Promise<void> {
  try {
    await prisma.user.delete({ where: { id } });
    revalidatePath('/');
  } catch (error) {
    console.error(error);
    throw new Error('删除用户失败');
  }
}
