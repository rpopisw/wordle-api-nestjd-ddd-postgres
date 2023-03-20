<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest
  # API WORDLE / NESTJS-POSTGRES-DDD-CQRS-DOCKER
</p>

## Description

Este es un proyecto de API construido con NestJS y MongoDB. La arquitectura sigue el patrón DDD y utiliza CQRS y value objects para mantener la cohesión y la separación de responsabilidades.

La API proporciona servicios: 

  * Crear Usuario
  * Sign-in Usuario
  * Comparar palabra 
  * Obtener lista de los 10 primeros usuarios con mas aciertos
  * obtener cuantas partidas a jugado un usuario y cuantas victorias ha tenido
  * obtener las palabras más acertadas

Además, este proyecto utiliza contenedores Docker para la fácil implementación y administración de la aplicación y la base de datos DynamoDB.

## Características:

* Patrón de arquitectura DDD
* CQRS para separar las operaciones de lectura y escritura
* Value objects para mantener la cohesión y la separación de responsabilidades
* Uso de Posgres como base de datos
* Generación de tokens seguros con JWT

## Estructura de Codigo 

![Screen Shot 2023-03-13 at 17 03 16](https://user-images.githubusercontent.com/69777661/224842214-7906a1a0-7de1-4848-886b-7e50f733efe0.png)


## Installation


1.- Clonar repositorio en tu local

2.- Instalar Dependencias 
```bash
$ npm install
```
3.- Crea un archivo .env con las variables de entorno necesarias. Consulta el archivo .env.example para ver los valores necesarios.

4.- Ir al directorio dockerfiles y levantar las imagenes

```bash
$ docker build -t nest-dev .
$ docker build -t mongodb-image  -f Dockerfile.mongodb .
```

5.- Crear los contenedores de la bd y la aplicacion en dev

```bash
$ docker run -d app-nestjs-dev -p 3000:3000 -v $(pwd):/app nestjs-dev
$ docker run -p 27017:27017 mongodb-image
```
## Uso 

## Crear Token 

Url: `card/create-token`

Header: pk:pk_test_dsd

Body: 

```bash
{
	"card_number":"4111111111111111",
	"expiration_year":"2023",
	"expiration_month":"02",
	"cvv":"123",
	"email":"robert@gmail.com"
}
```

Respuesta: 

```bash
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYXJkTnVtYmVyIjoiNDExMTExMTExMTExMTExMSIsImN2diI6IjEyMyIsImV4cGlyYXRpb25Nb250aCI6IjAyIiwiZXhwaXJhdGlvblllYXIiOiIyMDIzIiwiZW1haWwiOiJyb2JlcnRAZ21haWwuY29tIiwiaWF0IjoxNjc4NzM2ODIxLCJleHAiOjE2Nzg3MzY4ODF9.K9tJNMZLHvNvYdiGyvKOu_rqjQmzC3bNQgO7h8f1gWQ",
	"cardNumber": "4111111111111111",
	"cvv": "123",
	"expirationMonth": "02",
	"expirationYear": "2023",
	"email": "robert@gmail.com"
}
```

## Obtener tarjeta por token


url: `card/:token`

Header: pk:pk_test_dsd

Respuesta: 

```bash
{
"cardNumber": "4111111111111111",
	"expirationMonth": "02",
	"expirationYear": "2023",
	"email": "robert@gmail.com"
}
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Enlace de la documentacion 

http://localhost:3000/docs
