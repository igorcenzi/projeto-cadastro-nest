# Projeto Cadastro de Usuários com NestJs

Este foi um projeto para estudos do Framework NestJs junto com Redis, Typeorm, Postgres e Docker.
É uma API REST construida utilizando o padrão MVC.
Neste projeto, temos 3 telas, a Home onde são feitos os cadastros de usuários, o Login, onde você pode autenticar o usuário que cadastrou,
e também um Dashboard, onde você pesquisa o usuário cadastrado pelo CPF e depois pode alterar os dados, excluir aquele usuário ou resetar 
a senha, gerando uma nova.

## Instruções para executar o projeto
### Ferramentas necessárias:
- Git
- Node
- Yarn
- Docker
- Docker-compose cli

### Baixando nosso repositório do projeto:
Execute o comando a seguir no seu terminal:

```
git clone git@github.com:igorcenzi/projeto-cadastro-nest.git
```

### Executando o Backend

Após baixar o repositório, entre na pasta backend e execute o comando para instalar as dependências do projeto:

```
yarn
```
Com as dependências baixadas, temos que rodar o docker-compose para gerar os containers do Redis e do Postgres

```
docker-compose up -d
```

Agora que os containers estão prontos, podemos executar os testes e2e:

```
yarn test:e2e
```

Quando os testes finalizarem, você pode conferir se estão todos funcionando e logo em seguida finalizar os testes executando Ctrl+C no terminal.

Para iniciar o backend NestJs, basta executar o comando:

```
yarn start:dev
```

Pronto, o backend está funcionando.

### Iniciando o Frontend

É apenas um frontend em ReactJs simples, você só precisa entrar na pasta frontend e instalar as dependências com o comando:

```
yarn
```
E logo em seguida executar:

```
yarn start
```

