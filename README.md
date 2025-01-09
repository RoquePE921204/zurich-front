# Zurich Insurance Front

Proyecto desarrollado en Angular para la visualización y administración de **Clientes** y **Pólizas de Seguros**. Esta aplicación permite a los administradores gestionar de manera eficiente la información relacionada con clientes y pólizas, interactuando con la API backend de Zurich Insurance.

---

## Tabla de Contenidos

1. [Descripción General](#descripción-general)
2. [Objetivos y Funcionalidades](#objetivos-y-funcionalidades)
3. [Requisitos Previos](#requisitos-previos)
4. [Instalación](#instalación)
5. [Ejecución](#ejecución)
6. [Endpoints Utilizados](#endpoints-utilizados)
   - [User](#user)
   - [Client](#client)
   - [Insurance](#insurance)
7. [Despliegue](#despliegue)
8. [Contacto](#contacto)

---

## Descripción General

El proyecto **Zurich Insurance Front** es una interfaz de usuario construida con Angular, que ofrece funcionalidades para la gestión de clientes y pólizas de seguros. La aplicación se comunica con un backend RESTful mediante los endpoints de la **Zurich Insurance API**.

---

## Objetivos y Funcionalidades

- **Autenticación de Usuarios**: Login mediante credenciales.
- **Administración de Clientes**: Crear, visualizar, editar y eliminar clientes.
- **Administración de Pólizas**: Crear, visualizar, editar y eliminar pólizas de seguros.
- **Interfaz Amigable**: Diseño intuitivo y fácil de usar para los usuarios.

---

## Requisitos Previos

- **Node.js 20.16.0**
- **Angular CLI 19**
- **NPM 10.8.1**
- (Opcional) **Docker**, contemplado para futuros despliegues

---

## Instalación

1. **Clonar** el repositorio:
   ```bash
   git clone https://github.com/RoquePE921204/zurich-front.git
   cd zurich-front
   ```
2. **Instalar las dependencias**:
   ```bash
   npm install
   ```

---

## Ejecución

1. **Levantar la aplicación en modo desarrollo**:
   ```bash
   npm start
   ```
2. **Puerto por defecto**: `4200`
3. **Acceder a la aplicación**:
   [http://localhost:4200](http://localhost:4200)

---

## Endpoints Utilizados

### User

Operaciones relacionadas con el login de usuarios.

- **POST /user/login**  
  Autentica un usuario recibiendo un `LoginRequest` con `user` y `password`.

### Client

Operaciones relacionadas con los clientes.

- **GET /client/{id}**  
  Obtiene un cliente específico por su ID.
- **PUT /client**  
  Actualiza un cliente existente recibiendo un `ClientRequest` con los datos.
- **POST /client**  
  Crea un nuevo cliente con los datos de un `ClientRequest`.
- **DELETE /client/{id}**  
  Elimina un cliente por su ID.
- **GET /client/list**  
  Lista todos los clientes registrados.

### Insurance

Operaciones relacionadas con las pólizas.

- **GET /insurance/{id}**  
  Obtiene una póliza específica por su ID.
- **PUT /insurance**  
  Actualiza una póliza existente con un `InsuranceRequest`.
- **POST /insurance**  
  Crea una nueva póliza con un `InsuranceRequest`.
- **DELETE /insurance/{id}**  
  Elimina una póliza por su ID.
- **GET /insurance/list/{id}**  
  Lista pólizas asignadas a un cliente con un ID.

---

## Despliegue

Actualmente, no se ha implementado un despliegue formal en **Docker** u otro ambiente. Está contemplado para versiones futuras de este proyecto.

---

## Contacto

**Autor**: Emanuel Roque Pimentel  
**Email**: roque.p.e.921204@gmail.com
