# Stage 1: Build
FROM openjdk:23-jdk AS build
WORKDIR /app

COPY pom.xml .
COPY mvnw .
COPY .mvn .mvn
COPY src src

RUN chmod +x mvnw && ./mvnw clean package -DskipTests

# Stage 2: Runtime
FROM openjdk:23-jdk-slim
WORKDIR /app

COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]