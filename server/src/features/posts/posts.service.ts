import { UpdatePostDto } from './dto/update-post.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { Injectable } from '@nestjs/common';
import { prisma } from 'src/utils/prisma';

@Injectable()
export class PostsService {
  async create(createPostDto: CreatePostDto) {
    const { content, password } = createPostDto;

    if (password !== '123123') {
      return {
        message: 'Invalid password'
      }
    }

    const createdPost = await prisma.post.create({
      data: {
        content,
      },
    })

    return {
      createdPost
    }
  }

  async findAll() {
    const posts = await prisma.post.findMany({
      where: {
        deletedAt: null
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return {
      quantity: posts.length,
      posts,
    }
  }

  async findOne(id: string) {
    const post = await prisma.post.findUnique({
      where: {
        id,
        deletedAt: null
      }
    })

    return {
      post
    }
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    const updatedPost = await prisma.post.update({
      where: {
        id,
        deletedAt: null
      },
      data: {
        ...updatePostDto
      }
    })

    return {
      updatedPost
    }
  }

  async remove(id: string) {
    const post = await prisma.post.findUnique({
      where: {
        id,
        deletedAt: null
      }
    })

    if (!post) {
      return {
        message: 'Post not found!'
      }
    }

    await prisma.post.update({
      where: {
        id,
        deletedAt: null
      },
      data: {
        deletedAt: new Date()
      }
    })

    return {
      post
    }
  }

  async likePost(id: string) {
    const post = await prisma.post.findUnique({
      where: {
        id,
        deletedAt: null
      }
    })

    if (!post) {
      return {
        message: 'Post not found!'
      }
    }

    const updatedPost = await prisma.post.update({
      where: {
        id,
        deletedAt: null
      },
      data: {
        likes: post.likes + 1
      }
    })

    return {
      post: updatedPost
    }
  }
}
