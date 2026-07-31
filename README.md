
Biblioteca (Backend + Frontend + PostgreSQL).

▶️ Instrucciones para ejecutar el proyecto
git clone https://github.com/valen1032/Biblioteca-Fullstack-.git
→ Clonar el repositorio.

cd biblioteca-backend/Back
→ Entrar a la carpeta del backend.

mvn clean install
→ Compilar y preparar dependencias.

mvn spring-boot:run
→ Ejecutar el backend en http://localhost:8080.

cd ../Front
→ Entrar a la carpeta del frontend.

npm install
→ Instalar dependencias del frontend.

npm start
→ Ejecutar el frontend en http://localhost:3000.

pg_dump -U postgres -d biblioteca > Back/data/backup.dump
→ Generar respaldo de la base de datos.

psql -U postgres -d biblioteca < Back/data/backup.dump
→ Restaurar el respaldo en otra máquina.

git push origin main
→ Subir cambios al repositorio remoto.
