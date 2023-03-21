<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest
  # API WORDLE / NESTJS-POSTGRES-DDD-CQRS-DOCKER
</p>

## Description

Este es un proyecto de API construido con NestJS y Posgress. La arquitectura sigue el patrón DDD y utiliza CQRS para mantener la cohesión y la separación de responsabilidades.

La API proporciona servicios: 

  * Crear Usuario
  * Sign-in Usuario
  * Comparar palabra 
  * Obtener lista de los 10 primeros usuarios con mas aciertos
  * obtener cuantas partidas a jugado un usuario y cuantas victorias ha tenido
  * obtener las palabras más acertadas

Todos los servicios podran verlos en la documentacion ingresando a 

## http://localhost:3000/docs

Además, este proyecto utiliza contenedores Docker para la fácil implementación y administración de la aplicación y la base de datos Postgres.

## Características:

* Patrón de arquitectura DDD
* CQRS para separar las operaciones de lectura y escritura
* Value objects para mantener la cohesión y la separación de responsabilidades
* Uso de Posgres como base de datos
* Generación de tokens seguros con JWT



## Installation


1.- Clonar repositorio en tu local

2.- Instalar Dependencias 
```bash
$ npm install
```
3.- Crea un archivo .env con las variables de entorno necesarias. Consulta el archivo .env.example para ver los valores necesarios.

4.- Ir al directorio dockerfiles y levantar las imagenes

```bash
$ docker build -t nest-dev -f Dockerfile.app.
$ docker build -t postgres-image  -f Dockerfile.db .
```

5.- Crear los contenedores de la bd y la aplicacion en dev

```bash
$ docker run -d app-nestjs-dev -p 3000:3000 -v $(pwd):/app nestjs-dev
$ docker run --name my-postgres-container -d -p 5432:5432 -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=admin -e POSTGRES_DB=wordless  my-postgres-image
```

## Enlace de la documentacion ( SWAGER )

http://localhost:3000/docs

## Uso 

## Crear User 

Url: `/user`

Body: 

```bash
{
	"userName":"rpopis",
	"password":"1234",
	"rol":"admin"
}
```

Respuesta: 

```bash
{
	"id": "8553d146-4b60-49f7-959e-0f4ab04f6a7b",
	"userName": "rpopis",
	"password": "$2b$10$SZcP8pR4eRnF2HYZzwwHCODkiA1uiqFWyG54BA7IUcI9bDNAgz.Ra",
	"rol": "admin",
	"createdAt": "2023-03-20T06:16:38.403Z"
}
```

## Sign-in


url: `/user/sign-in`

Respuesta: 

```bash
{
	"userName":"rpopis",
	"password":"1234"
}
```

## Match words


url: `/word/match`


Body: 

```bash
{
	"word":"zanco"
}
```

Respuesta: 

```bash
[
	{
		"letter": "z",
		"value": 3
	},
	{
		"letter": "a",
		"value": 1
	},
	{
		"letter": "n",
		"value": 2
	},
	{
		"letter": "c",
		"value": 3
	},
	{
		"letter": "o",
		"value": 3
	}
]
```

## Get first 10


url: `/user/max-points?number=10`

Respuesta: 

```bash
[
	{
		"userName": "rpopis",
		"points": "12"
	},
  {
		"userName": "jsilva",
		"points": "3"
	}
]
```

## Get report games by user

url: `/user/report-games/:userID`

Respuesta: 

```bash
{
	"winnerGames": 1,
	"totalGames": 10
}
```

## word more resolved

url: `word/report-word-resolved?limit=3`

```bash

[
	{
		"word": "zanco",
		"id": 643473,
		"resolved": "1"
	}
] 
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
