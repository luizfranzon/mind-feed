import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsController } from './features/posts/posts.controller';
import { PostsService } from './features/posts/posts.service';
import { PostsModule } from './features/posts/posts.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PostsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
