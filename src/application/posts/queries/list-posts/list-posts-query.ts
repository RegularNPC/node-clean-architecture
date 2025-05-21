import { toDto } from './list-posts-query-mapper';

export type ListPostsQuery = Readonly<{
  pageNumber: number;
  pageSize: number;
}>;

export function makeListPostsQuery({
  postsRepository,
}: Pick<Dependencies, 'postsRepository'>) {
  return async function listPostsQuery(query: ListPostsQuery) {

    const { pageNumber, pageSize } = query;

    const { count, posts } = await postsRepository.list({
      pageNumber,
      pageSize,
    });

    return toDto({
      count,
      pageNumber,
      pageSize,
      posts,
    });
  };
}
