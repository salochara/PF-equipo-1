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

**chasIT** es una solución que une a personas que necesitan realizar trabajos, y a personas que los pueden realizar.  Usuarios que requieren que se haga un trabajo, por ejemplo pintar una cocina, pueden hacer una petición a todos los trabajadores relevantes registrados en la zona, en este ejemplo son los pintores nada más, y los trabajadores pueden aceptar el trabajo si están de acuerdo con las condiciones.

## 3. Solución

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
Escogimos usar SQL con Microsoft Azure porque los tipos que estamos manejando son muy fijos y no requieren de una estructura más complicada que una tabla.  También como sólo maneja tablas pequeñas (categoría, sub-categoría, servicios, etc.), no se espera que tenga que manejar cantidades grandes de datos (como los usuarios registrados por ejemplo).  Por ejemplo, guardamos las categorías con el siguiente formato (definido en C#):
```sh
namespace YeloMWS.Models.Category
{
    public class YeloCategory
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public virtual YeloCategory ParentCategory { get; set; }
        public string CodeName { get; set; }
        public string IconResource { get; set; }
    }
}
```

### 3.2 Arquitectura de la solución

*[Incluya aquí un diagrama donde se aprecie la arquitectura de la solución propuesta, así como la interacción entre los diferentes componentes de la misma.]*

### 3.3 Frontend



#### 3.3.1 Lenguaje de programación
El frontend está programado en JavaScript.  Hay código en HTML/CSS (no lenguajes de programación pero cabe mencionar).
#### 3.3.2 Framework
| Framework | Utilidad |
| ------ | ------ |
| vue | Facilita la creación de interfaces, especialmente en sitios de una sola página. |
| node.js | Server environment entre muchas otras cosas |

#### 3.3.3 Librerías de funciones o dependencias
| Dependencia | Utilidad |
| ------ | ------ |
| axios | Promise-based HTTP client de node.js |
| babel-runtime | Convertidor de ECMAScript |
| change-case | Cambiar el case de caracteres |
| chart.js | Para hacer gráficas |
| datables.net | JQuery plugin para manejar llamadas de JSON |
| faker | Para generar datos |
| hideseek | JQuery plugin para hace búsquedas  |
| http-server | Servidor de http |
| jquery | JavaScript utility library |
| lodash | JavaScript utility library |
| moment | Libreria para manejar fechas |
| nes | Websockets que trabajan sobre hapi |
| querystring | Para procesar URLs |
| sweetalert2 | Para hacer alertas en JavaScript de forma bonita |
| v-tooltip | On hover tool tips |
| validator | Validator/sanitiser de strings |
| vue | Framework para crear interfaces |
| vuex | Manejo de estados de Vue |

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
- http://generatedata.com/ - Generador de datos
- https://www.json-generator.com/ - Generador de datos
- https://docs.mongodb.com/manual/reference/ - Documentación de Mongo
- https://docs.microsoft.com/en-us/azure/sql-database/ - Documentación de Azure SQL
- https://github.com/JKHeadley/appy - Template de dashboard
- https://azure.microsoft.com/en-us/services/kubernetes-service/docker/ - Información sobre Azure y cómo conectarlo con Docker
- https://scotch.io/tutorials/building-a-modern-app-using-nestjs-mongodb-and-vuejs - Tutorial, varios
- https://vuejs.org/v2/guide/ - Tutorial para usar Vue
