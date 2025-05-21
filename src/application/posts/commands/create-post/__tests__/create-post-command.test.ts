import { PostsRepository } from '@application/common/interfaces';

import { makeCreatePostCommand } from '../create-post-command';

describe('createPostCommand', () => {
  function setup() {
    const postsRepository = jest.mocked<Partial<PostsRepository>>({
      create: jest.fn(),
    }) as jest.Mocked<PostsRepository>;

    const createPostCommand = makeCreatePostCommand({ postsRepository });

    return {
      createPostCommand,
      postsRepository,
    };
  }

  describe('given an invalid command', () => {
    it('should not throw an exception', async () => {
      // Arrange
      const { createPostCommand, postsRepository } = setup();
      postsRepository.create.mockResolvedValueOnce({ id: 'id' });

      // Act
      const result = await createPostCommand({
        title: '', // Cannot be empty
      });

      // Assert
      expect(postsRepository.create).toHaveBeenCalled();
      expect(result).toEqual({ id: 'id' });
    });
  });

  describe('given a valid command', () => {
    it('should create post and return the generated id', async () => {
      // Arrange
      const { createPostCommand, postsRepository } = setup();
      postsRepository.create.mockResolvedValueOnce({
        id: '907b0a0b-9a12-4073-ab27-3ad5927955e9',
      });

      // Act
      const result = await createPostCommand({
        title: 'My first post',
      });

      // Assert
      expect(result).toEqual({ id: '907b0a0b-9a12-4073-ab27-3ad5927955e9' });
    });
  });
});
