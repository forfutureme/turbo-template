import { searchUserInfo } from '@/app/model/user';
export const dynamic = 'force-dynamic';
export async function GET(
  req: Request & { nextUrl: { searchParams: URLSearchParams } },
  { params }: { params?: { id: string } },
): Promise<Response> {
  const id = params?.id ?? '';
  const list = await searchUserInfo(id);
  return Response.json({ list });
}
