# TC3041 Proyecto  Final Primavera 2019

# *chasIT - Chas y lo tienes!*
---

##### Integrantes:
1. Salomon Charabati
2. Mauricio Coello
3. Eric Parton


---
## 1. Aspectos generales

### 1.1 Requerimientos técnicos

A continuación se mencionan los requerimientos técnicos mínimos del proyecto, favor de tenerlos presente para que cumpla con todos.

* El equipo tiene la libertad de elegir las tecnologías de desarrollo a utilizar en el proyecto, sin embargo, debe tener presente que la solución final se deberá ejecutar en una plataforma en la nube. Puede ser  [Google Cloud Platform](https://cloud.google.com/?hl=es), [Azure](https://azure.microsoft.com/en-us/) o AWS [AWS](https://aws.amazon.com/es/free/).
* El proyecto debe utilizar al menos dos modelos de bases de datos diferentes, de los estudiados en el curso.
* La solución debe utilizar una arquitectura de microservicios. Si no tiene conocimiento sobre este tema, le recomiendo la lectura [*Microservices*](https://martinfowler.com/articles/microservices.html) de [Martin Fowler](https://martinfowler.com).
* La arquitectura debe ser modular, escalable, con redundancia y alta disponibilidad.
* La arquitectura deberá estar separada claramente por capas (*frontend*, *backend*, *API RESTful*, datos y almacenamiento).
* Los diferentes componentes del proyecto (*frontend*, *backend*, *API RESTful*, bases de datos, entre otros) deberán ejecutarse sobre contenedores [Docker](https://www.docker.com/) y utilizar [Kubernetes](https://kubernetes.io/) como orquestador.
* Todo el código, *datasets* y la documentación del proyecto debe alojarse en un repositorio de GitHub siguiendo al estructura que aparece a continuación.

### 1.3 Documentación  del proyecto

Como parte de la entrega final del proyecto, se debe incluir la siguiente información:

### Descripción del o los datasets y las fuentes de información utilizadas.
### Documentación de la API. Puede ver un ejemplo en [Swagger](https://swagger.io/).

## 2. Descripción del proyecto

chasIT es una solución que une a personas que necesitan realizar trabajos, y a personas que los pueden realizar.

## 3. Solución

A continuación aparecen descritos los diferentes elementos que forman parte de la solución del proyecto.

### 3.1 Modelos de bases de datos utilizados
#### MongoDB
Usamos MongoDB porque la compatibilidad que ofrece fue ideal para cumplir los objetivos del proyecto.  Poder comunicar los datos en formato JSON dentro de la aplicación fue muy conveniente y fue fácil de encontrar documentación.  Lo usamos para el almacenamiento de los usuarios usando documentos con el siguiente formato:
```sh
  "_id": "5ccb587c7bc7b000113c8f6e",
  "firstName": "Juan",
  "lastName": "Gomez",
  "email": "juan.gomez@gmail.com.com",
  "title": "International Plumber",
  "profileImageUrl": "https://s3.amazonaws.com/uifaces/faces/juangomez/128.jpg",
  "role": "5ccb587a7bc7b000113c8f51",
  "isActive": true,
  "roleName": "Admin",
  "roleRank": 1,
  "createdAt": "2019-04-20T20:52:12.150Z",
  "isEnabled": true,
  "passwordUpdateRequired": false,
  "pinUpdateRequired": false,
  "isDeleted": false
```
#### Azure SQL

### 3.2 Arquitectura de la solución

*[Incluya aquí un diagrama donde se aprecie la arquitectura de la solución propuesta, así como la interacción entre los diferentes componentes de la misma.]*

### 3.3 Frontend

*[Incluya aquí una explicación de la solución utilizada para el frontend del proyecto. No olvide incluir las ligas o referencias donde se puede encontrar información de los lenguajes de programación, frameworks y librerías utilizadas.]*

#### 3.3.1 Lenguaje de programación
#### 3.3.2 Framework
#### 3.3.3 Librerías de funciones o dependencias

### 3.4 Backend

*[Incluya aquí una explicación de la solución utilizada para el backend del proyecto. No olvide incluir las ligas o referencias donde se puede encontrar información de los lenguajes de programación, frameworks y librerías utilizadas.]*

#### 3.4.1 Lenguaje de programación
#### 3.4.2 Framework
#### 3.4.3 Librerías de funciones o dependencias

### 3.5 API

*[Incluya aquí una explicación de la solución utilizada para implementar la API del proyecto. No olvide incluir las ligas o referencias donde se puede encontrar información de los lenguajes de programación, frameworks y librerías utilizadas.]*

#### 3.5.1 Lenguaje de programación
#### 3.5.2 Framework
#### 3.5.3 Librerías de funciones o dependencias

*[Incluya aquí una explicación de cada uno de los endpoints que forman parte de la API. Cada endpoint debe estar correctamente documentado.]*

*[Por cada endpoint debe incluir lo siguiente:]*

* **Descripción**:
* **URL**:
* **Verbos HTTP**:
* **Headers**:
* **Formato JSON del cuerpo de la solicitud**: 
* **Formato JSON de la respuesta**:


## 3.6 Pasos a seguir para utilizar el proyecto
- Clone el repositorio.
```sh
$ git clone https://github.com/salochara/PF-equipo-1/
```
- Haga docker-compose desde el directorio del proyecto para crear y conectar los contenedores.  Este paso sólo se tiene que hacer una vez.
```sh
$ git docker-compose build && docker-compose run --rm api npm run seed
```
- Haga docker-compose up cada vez que quiera correr el proyecto para levantar los contenedores de nuevo.
```sh
$ git docker-compose up --build
```
- El programa se puede visualizar en localhost:3000

## 4. Referencias

*[Incluya aquí las referencias a sitios de interés, datasets y cualquier otra información que haya utilizado para realizar el proyecto y que le puedan ser de utilidad a otras personas que quieran usarlo como referencia]*
