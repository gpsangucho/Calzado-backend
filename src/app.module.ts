import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MarcasModule } from './marcas/marcas.module';
import { CalzadosModule } from './calzados/calzados.module';
import { MailModule } from './mail/mail.module';

import { CursosModule } from './cursos/cursos.module' //****/

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

      // Conexión a MongoDB (Mongoose)
      MongooseModule.forRoot(process.env.MONGO_URI || ''),

     // Conexión a PostgreSQL (TypeORM)
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      //synchronize: true,
      //ssl: { rejectUnauthorized: false }, /**Descomentamos .... cambio 28may2025 */
    }),
    AuthModule,
    UsersModule,
    MarcasModule,
    CalzadosModule,
    MailModule,
    CursosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
  