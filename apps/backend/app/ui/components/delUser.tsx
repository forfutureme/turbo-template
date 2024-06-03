import { actionToDelUser } from '@/app/model/actions.user';
export default function DelUser({ id }: { id: string }): JSX.Element {
  const delUserWithId = actionToDelUser.bind(null, id);
  return (
    <form action={delUserWithId}>
      <button
        className="border-b border-b-blue-600 text-blue-500"
        type="submit"
      >
        删除
      </button>
    </form>
  );
}
