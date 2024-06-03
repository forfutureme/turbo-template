import { searchUsers } from '@/app/model/user';
export const dynamic = 'force-dynamic';
export async function GET(): Promise<Response> {
  const list = await searchUsers();
  return Response.json({ list });
}
