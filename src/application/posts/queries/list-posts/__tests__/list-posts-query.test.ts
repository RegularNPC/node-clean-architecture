import { PostsRepository } from '@application/common/interfaces';
import { Post } from '@domain/entities';

import { makeListPostsQuery } from '../list-posts-query';

describe('listPostsQuery', () => {
  function setup() {
    const postsRepository = jest.mocked<Partial<PostsRepository>>({
      list: jest.fn(),
    }) as jest.Mocked<PostsRepository>;

    const listPostQuery = makeListPostsQuery({ postsRepository });

    return {
      listPostQuery,
      postsRepository,
    };
  }

  describe('given an invalid query', () => {
    it('should still call the repository', async () => {
      // Arrange
      const { listPostQuery, postsRepository } = setup();
      postsRepository.list.mockResolvedValueOnce({ count: 0, posts: [] });

      // Act
      const result = await listPostQuery({
        pageNumber: 1,
        pageSize: 1000, // Cannot exceed 50
      });

      // Assert
      expect(postsRepository.list).toHaveBeenCalled();
      expect(result).toEqual(
        expect.objectContaining({ count: 0, posts: [] })
      );
    });
  });

  describe('given a valid query', () => {
    it('should list posts', async () => {
      // Arrange
      const { listPostQuery, postsRepository } = setup();

      postsRepository.list.mockResolvedValueOnce({
        count: 11,
        posts: [
          new Post({
            id: '907b0a0b-9a12-4073-ab27-3ad5927955e9',
            createdAt: new Date(2022, 1, 1),
            title: 'Mock post',
          }),
        ],
      });

      // Act
      const result = await listPostQuery({
        pageNumber: 2,
        pageSize: 10,
      });

      // Assert
      expect(result).toMatchSnapshot();
    });
  });
});
