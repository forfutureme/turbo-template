import { createUser } from '@/app/model/user';
export const dynamic = 'force-dynamic';
export async function POST(req: Request): Promise<Response> {
  const formData = await req.formData();
  const name = formData.getAll('name')[0] as string;
  const res = await createUser(name);
  return Response.json({ id: res.id });
}
