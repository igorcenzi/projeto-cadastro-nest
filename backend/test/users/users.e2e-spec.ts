import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, HttpStatus, INestApplication, NotFoundException, ValidationPipe } from '@nestjs/common';
import { UserModule } from '../../src/modules/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { CreateUserDto } from '../../src/users/dto/create-user.dto';
import * as jasmine from 'jasmine-node';
import { UpdateUserDto } from '../../src/users/dto/update-user.dto';
import {LoginModule} from '../../src/modules/login.module'
import {SearchCepModule} from '../../src/modules/searchcep.module'
import {RecoveryPasswordModule} from '../../src/modules/recoverypassword.module';


describe('Testes de rota:', () => {
  let app: INestApplication;
  let returnedUser;
  const user = {
      nome: "Igor",
      cpf: "123455788-1",
      cep: 13860102,
      logradouro: "Rua 1",
      numero: 95,
      cidade: "Mogi Mirim",
      estado: "São Paulo",
      password: "1234",
      telefone: "19997022403"
  }
  const updatedUser = {
    nome: "Novo nome",
  }


  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UserModule, LoginModule, SearchCepModule, RecoveryPasswordModule,TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5434,
        username: 'postgres',
        password: 'docker',
        database: 'postgrestest',
        autoLoadEntities: true,
        synchronize: true,
      })],
    }).compile();
    

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
  );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  })


  it('Create User /user', () => {
    return request(app.getHttpServer())
    .post('/user')
    .send(user as CreateUserDto)
    .expect(HttpStatus.CREATED)
    .then(({body}) => {
      returnedUser = body.id
    })
  });

  it('Create User /user expected error', () => {
    try{
      return request(app.getHttpServer())
      .post('/user')
      .send(updatedUser as CreateUserDto)
    }catch(error){
      expect(error).toBeInstanceOf(BadRequestException);
    }
  });

  it('Create User /user expected error', () => {
    try{
      const newUser = {
        name: "teste"
      }
      return request(app.getHttpServer())
      .post('/user')
      .send(user as CreateUserDto)
    }catch(error){
      expect(error).toBeInstanceOf(BadRequestException);
    }
  });

  it('Login User /login', () => {
    return request(app.getHttpServer())
    .post('/login')
    .send({cpf: user.cpf, password: user.password})
    .expect(HttpStatus.OK)
  });

  it('Login User /login', () => {
    return request(app.getHttpServer())
    .post('/login')
    .send({cpf: user.cpf, password: "0000"})
    .expect(HttpStatus.BAD_REQUEST)
  });

  it('Get All /user', () => {
    return request(app.getHttpServer())
    .get('/user')
    .expect(HttpStatus.OK)
  })

  it('Update User /user/:id', () => {
    
    return request(app.getHttpServer())
    .patch(`/user/${returnedUser}`)
    .send(updatedUser as UpdateUserDto)
    .expect(HttpStatus.OK)
  });

  it('Update User /user/:id NotFoundException', () => {
    try{
      const newUser = {
        name: "teste"
      }
      return request(app.getHttpServer())
      .patch(`/user/${0}`)
      .send(updatedUser as CreateUserDto)
    }catch(error){
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });

  it('Update User /user/:id BadRequestException', () => {
    try{
      const newUser = {
        cpf: 12345678-0
      }
      return request(app.getHttpServer())
      .patch(`/user/${0}`)
      .send(updatedUser as CreateUserDto)
    }catch(error){
      expect(error).toBeInstanceOf(BadRequestException);
    }
  });

  it('Recovery Password by CPF /recovery', async () => {
    return await request(app.getHttpServer())
    .get(`/recovery/${user.cpf}`)
    .expect(HttpStatus.OK)
  });

  it('Recovery Password by CPF /recovery NotFoundException', async () => {
    return await request(app.getHttpServer())
    .get(`/recovery/${0}`)
    .expect(HttpStatus.NOT_FOUND)
  });

  it('Delete User /user/:id', () => {
    return request(app.getHttpServer())
    .delete(`/user/${returnedUser}`)
    .expect(HttpStatus.NO_CONTENT)
  })

  it('Delete User /user/:id NotFoundException', () => {
    try{
      return request(app.getHttpServer())
      .delete(`/user/${0}`)
    }catch(error){
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });

  it('Search CEP /cep/:cep', async () => {
    return await request(app.getHttpServer())
    .get(`/cep/${13860102}`)
    .expect(HttpStatus.OK)
  });

  it('Search CEP /cep/:cep', () => {
    return request(app.getHttpServer())
    .get(`/cep/${13860104}`)
    .expect(HttpStatus.OK)
  });

  it('Search CEP /cep/:cep', () => {
    return request(app.getHttpServer())
    .get(`/cep/${13860108}`)
    .expect(HttpStatus.OK)
  });

  it('Search CEP /cep/:cep NotFoundException', async () => {
    return await request(app.getHttpServer())
    .get(`/cep/${13860103}`)
    .expect(HttpStatus.NOT_FOUND)
  });

});