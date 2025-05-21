import { Post } from '@domain/entities';


export type CreatePostCommand = Readonly<{
  title: string;
}>;

export function makeCreatePostCommand({
  postsRepository,
}: Pick<Dependencies, 'postsRepository'>) {
  return async function createPostCommand(command: CreatePostCommand) {

    const post = new Post({
      createdAt: new Date(),
      title: command.title,
    });

    const { id } = await postsRepository.create({ post });

    return {
      id,
    };
  };
}
