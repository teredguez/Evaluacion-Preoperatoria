# Sistema Web para la Evaluación Preoperatoria y Soporte Predictivo

## Descripción

Este proyecto corresponde al **Trabajo Fin de Grado** titulado **"Sistema Web para la Evaluación Preoperatoria y Soporte Predictivo"**.

La aplicación ha sido desarrollada para apoyar el proceso de evaluación preoperatoria realizado por el **Servicio de Anestesiología del Hospital Álvaro Cunqueiro de Vigo**. El sistema permite registrar la información clínica del paciente, calcular automáticamente distintas escalas médicas, generar informes clínicos en formato PDF e incorporar un módulo de soporte a la decisión capaz de estimar el riesgo cardiovascular del paciente.

La solución se ha desarrollado siguiendo una arquitectura **cliente-servidor** y se encuentra completamente contenerizada mediante **Docker**.

---
## Capturas de la aplicación
### Dashboard principal

<p align="center">
  <img src="https://github.com/user-attachments/assets/4dff8671-ebe9-47d8-963c-7754a8a3430c" width="90%" />
</p>

### Formulario

<p align="center">
  <img src="https://github.com/user-attachments/assets/1807545a-03ca-4e00-ba10-b38b0ee089f3" width="90%" />
</p>

### Perfil del usuario

<p align="center">
  <img src="https://github.com/user-attachments/assets/f5fb9ed7-a87c-4963-9a14-2e4a6ccf5025" width="90%" />
</p>

### Extracto del informe generado

<p align="center">
  <img 
    src="https://github.com/user-attachments/assets/783cdb5e-63ed-498d-8e7b-25217838ca23" 
    width="75%" 
    alt="Extracto del informe generado por la aplicación"
  />
</p>


## Tecnologías utilizadas

### Frontend
- Angular
- TypeScript
- HTML5
- CSS3

### Backend
- Node.js
- Express

### Base de datos
- PostgreSQL

### Inteligencia Artificial
- Python
- Scikit-learn
- Regresión Logística

### Despliegue
- Docker
- Docker Compose

---

## Requisitos previos

Para ejecutar la aplicación únicamente es necesario disponer de:

- Docker Desktop
- Docker Compose

> **No es necesario instalar Node.js, Angular, PostgreSQL ni Python en el equipo anfitrión.**

---

## Despliegue

Situarse en la raíz del proyecto:

```bash
cd TFG_UO294178
```

Construir las imágenes e iniciar todos los servicios:

```bash
docker compose up --build
```

La primera ejecución puede tardar algunos minutos mientras Docker descarga las imágenes necesarias.

Una vez iniciado el sistema estarán disponibles los siguientes servicios:

| Servicio | Dirección |
|----------|-----------|
| Frontend | http://localhost:4200 |
| Backend API | http://localhost:3000 |
| PostgreSQL | localhost:5432 |

---

## Configuración inicial

La base de datos se inicializa automáticamente durante el despliegue mediante Docker.

Para facilitar la evaluación del proyecto, el sistema incluye un usuario administrador de prueba creado automáticamente durante la inicialización.

Una vez iniciada la sesión, el administrador podrá:

Autorizar nuevos usuarios.
Gestionar los usuarios registrados.
Dar de baja usuarios existentes.

Los nuevos usuarios autorizados deberán acceder a la opción Activar mi cuenta desde la pantalla de inicio para establecer su contraseña antes de poder iniciar sesión.
---

## Detener la aplicación

```bash
docker compose down
```

Para eliminar también los volúmenes persistentes:

```bash
docker compose down -v
```

---

## Funcionalidades principales

- Autenticación de usuarios.
- Gestión de usuarios por parte del administrador.
- Creación de evaluaciones preoperatorias.
- Guardado y recuperación de borradores.
- Cálculo automático de escalas clínicas.
- Generación de informes PDF.
- Consulta del historial de informes.
- Predicción automática del riesgo cardiovascular.
- Despliegue completo mediante Docker.

---

## Modelo predictivo

El módulo de soporte a la decisión ha sido desarrollado mediante **Python** utilizando una **Regresión Logística** entrenada sobre el conjunto de datos público **NHANES**.

Los coeficientes obtenidos durante el entrenamiento se integran posteriormente en la aplicación web para realizar las predicciones de riesgo cardiovascular durante la evaluación preoperatoria.

---


## Autor

**Teresa Domínguez**

Trabajo Fin de Grado

Grado en Ingeniería Informática del Software

Universidad de Oviedo
