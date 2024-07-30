# Use the official PostgreSQL image from the Docker Hub
FROM postgres:16.3

# Set environment variables
ENV POSTGRES_DB=bookstore
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=Nawy2024

# Copy the initialization script into the container
COPY ./init-db.sh /docker-entrypoint-initdb.d/

# Expose the PostgreSQL port
EXPOSE 5432
