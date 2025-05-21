
export type DeletePostCommand = Readonly<{
  id: string;
}>;

export function makeDeletePostCommand({
  postsRepository,
}: Pick<Dependencies, 'postsRepository'>) {
  return async function deletePostCommand(command: DeletePostCommand) {

    const { id } = command;

    await postsRepository.delete({ id });
  };
}
