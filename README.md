# 🖥️ Aplicación de Escritorio - Gestión de Turnos Empresarial

Aplicación de escritorio desarrollada con **Electron + Angular**, diseñada para facilitar la **gestión de turnos** tanto para empresas como para administradores.  

Permite a las **empresas** visualizar los turnos diarios de sus empleados, y a los **administradores** gestionar las empresas registradas dentro de la plataforma.

---

## 🧠 ¿Qué es Angular?

**Angular** es un framework de desarrollo frontend creado por Google que permite construir aplicaciones web robustas, reactivas y escalables. Ofrece una arquitectura basada en componentes, enrutamiento, servicios inyectables y una integración fluida con APIs REST.

En esta aplicación, Angular se encarga de toda la **interfaz de usuario**, la lógica del cliente y la comunicación con el backend a través de servicios.

---

## 🖼️ ¿Qué es Electron?

**Electron** es un framework que permite crear aplicaciones de escritorio utilizando tecnologías web como **HTML, CSS y JavaScript**. Funciona empaquetando tu aplicación web dentro de un contenedor que la hace ejecutable en **Windows, macOS y Linux**.

En este proyecto, Electron se encarga de:

- Ejecutar Angular como una app nativa de escritorio.
- Gestionar la ventana principal de la aplicación.
- Facilitar la distribución multiplataforma.

---

## 🔐 Roles y Accesos

- **Empresa**:
  - Ingreso mediante login empresarial.
  - Visualización de **empleados registrados**.
  - Eliminación de empleados registrados.
  - Consulta de **turnos marcados por los empleados** en fechas específicas.
  
- **Administrador**:
  - Ingreso como superusuario.
  - Gestión de **empresas registradas** en la aplicación.
  - Creación de nuevas empresas mediante formulario.
  - Eliminación de empresas y sus trabajadores correspondientes.

---

## 🧩 Funcionalidades Principales

- 🔐 Autenticación según rol (empresa o administrador).
- 🧑‍💼 Visualización de empleados por empresa.
- 📅 Listado de turnos diarios por trabajador.
- 🏢 Gestión de empresas desde panel administrador.
- 🔗 Conexión a una API externa mediante un **servicio dedicado a la gestión de roles**.
- 💾 Aplicación de escritorio multiplataforma (Windows, macOS, Linux).

---
## 🛠️ Tecnologías Utilizadas

- **Electron** (v36.2.0)
- **Angular** (v19.2.0)
- **TypeScript**
- **SCSS**
- **Node.js** y **npm** para gestión de dependencias
- **API REST** para la autenticación y gestión de datos

---

## ⚙️ Instalación y Ejecución

### 🔧 Requisitos previos

- Node.js instalado
- Angular CLI (`npm install -g @angular/cli`)

### 📦 Instalación

```bash
git clone https://github.com/tuusuario/gestion-turnos-desktop.git
cd gestion-turnos-desktop
npm install
```

### ▶️ Ejecución en modo desarrollo
```bash
npm run electron:start
```
### 📦 Empaquetado para distribución
```bash
npm run electron:build
```

## 📌 Notas Adicionales
El sistema es fácilmente escalable para incluir más roles (por ejemplo: supervisores, RRHH).

Puedes añadir notificaciones de escritorio, sincronización offline y funcionalidades avanzadas como exportación de reportes.

## 🧑‍💻 Desarrollado por
Alejandra Bernal López

Para sugerencias, mejoras o errores, ¡no dudes en contactarnos o abrir un issue!
