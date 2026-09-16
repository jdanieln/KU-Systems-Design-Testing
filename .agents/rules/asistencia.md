# Regla de Asistencia y Sincronización de Entorno

Esta regla define el flujo automatizado cuando un estudiante solicita registrar su asistencia, sincronizar los últimos cambios o confirmar la configuración de su entorno en Antigravity.

## Triggers del Prompt
Se activa ante prompts como:
- "Sincroniza la última versión y sube mi confirmación de asistencia con mi usuario: <usuario>"
- "Registra mi asistencia y sincroniza mi entorno"
- "Baja los últimos cambios del repo y sube mi confirmación de entorno"
- O cualquier instrucción similar relacionada con asistencia / check-in / confirmación de entorno.

## Procedimiento a Ejecutar por Antigravity

1. **Identificar al Estudiante / Usuario:**
   - Extraer el nombre de usuario indicado en el mensaje del alumno.
   - Si no lo especificó en el prompt, consultar la configuración local de Git (`git config user.name` o `git config user.email`) o pedirle brevemente su usuario.
   - Normalizar el nombre de usuario para el nombre de archivo (letras, números, guiones: e.g., `juan-perez`).

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
