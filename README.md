
Biblioteca (Backend + Frontend + PostgreSQL).

▶️ Instrucciones para ejecutar el proyecto
1 git clone https://github.com/valen1032/Biblioteca-Fullstack-.git
→ Clonar el repositorio.

2 cd biblioteca-backend/Back
→ Entrar a la carpeta del backend.

3 mvn clean install
→ Compilar y preparar dependencias.

4 mvn spring-boot:run
→ Ejecutar el backend en http://localhost:8080.

5 cd ../Front
→ Entrar a la carpeta del frontend.

6 npm install
→ Instalar dependencias del frontend.

7 npm start
→ Ejecutar el frontend en http://localhost:3000.

8 pg_dump -U postgres -d biblioteca > Back/data/backup.dump
→ Generar respaldo de la base de datos.

9 psql -U postgres -d biblioteca < Back/data/backup.dump
→ Restaurar el respaldo en otra máquina.

10 git push origin main
→ Subir cambios al repositorio remoto.
