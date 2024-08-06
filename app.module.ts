import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'nestuser',
      password: 'nestpassword',
      database: 'nestdb',
      autoLoadEntities: true,
      // synchronize: true, // Note: Do not use synchronize in production, it may cause data loss
    }),
    AuthModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
