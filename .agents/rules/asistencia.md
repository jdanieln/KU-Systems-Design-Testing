# Regla de Asistencia y Sincronización de Entorno

Esta regla define el flujo automatizado cuando un estudiante solicita registrar su asistencia, sincronizar los últimos cambios o confirmar la configuración de su entorno en Antigravity.

## Triggers del Prompt en Lenguaje Natural
Los alumnos **no conocen Git ni terminología técnica**. Hablarán en lenguaje cotidiano.
Debes activar este flujo con cualquier frase equivalente a:
- *"Hola, actualiza mi proyecto con lo último del curso y registra mi asistencia. Mi usuario/nombre es [usuario]"*
- *"Pasa mi asistencia de hoy y descarga los cambios de la clase. Soy [usuario]"*
- *"Revisa si mi entorno está listo para la clase y regístrame. Mi nombre es [usuario]"*
- *"Actualiza el código y confirma mi asistencia"*
- *"Hola, vengo llegando a clase, registra mi asistencia"*

## Procedimiento a Ejecutar por Antigravity

1. **Identificar al Estudiante / Usuario (Amigable y sin tecnicismos):**
   - Extraer el nombre o usuario si el alumno lo incluyó en el mensaje.
   - Si **no** lo indicó:
     - Revisa primero si está configurado en `git config user.name`.
     - Si no hay un nombre claro, pregúntale de forma cordial: *"¡Hola! Con gusto actualizo tu proyecto y registro tu asistencia. ¿Cuál es tu nombre completo o usuario de GitHub para el registro?"*.
   - Limpia y normaliza el identificador para el archivo (ejemplo: `pedro-perez` o su usuario de GitHub).

2. **Sincronizar la Última Versión del Repositorio:**
   - Ejecutar:
     ```bash
     git pull origin main
     ```
   - Si existen cambios locales no guardados, advertir al alumno o hacer stash temporal si es necesario.

3. **Verificar el Entorno Local del Alumno:**
   - Comprobar que cuente con las herramientas esenciales ejecutando:
     - `python3 --version`
     - `node --version` y `npm --version`
   - Si alguna herramienta falta, notificar al alumno con instrucciones breves para instalarla.

4. **Crear o Actualizar el Archivo de Confirmación:**
   - Crear el archivo en la ruta:
     `asistencia/<usuario>.md`
   - Contenido del archivo:
     ```markdown
     # Confirmación de Entorno y Asistencia

     - **Estudiante / Usuario:** <usuario>
     - **Fecha y Hora:** <YYYY-MM-DD HH:mm:ss>
     - **Python:** <versión detectada>
     - **Node.js:** <versión detectada>
     - **NPM:** <versión detectada>
     - **Estado:** Entorno verificado y sincronizado con origin/main
     ```

5. **Hacer Commit y Push:**
   - Agregar el archivo al staging:
     ```bash
     git add asistencia/<usuario>.md
     ```
   - Crear el commit con el nombre de usuario:
     ```bash
     git commit -m "Asistencia: Confirmación de entorno de <usuario>"
     ```
   - Enviar los cambios al repositorio:
     ```bash
     git push origin main
     ```
     *(Si el alumno trabaja en un branch específico o fork, hacer push a su rama correspondiente).*

6. **Confirmar al Alumno:**
   - Responder al estudiante confirmando:
     - Que los cambios remotos fueron descargados (`git pull`).
     - Las versiones detectadas de sus herramientas.
     - El hash del commit generado con su usuario.
     - Que la asistencia quedó registrada y subida a GitHub exitosamente.
