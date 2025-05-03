# stage 1: build
FROM openjdk:23-jdk AS build
WORKDIR /app

COPY pom.xml .
COPY mvnw .
COPY .mvn .mvn
COPY src src

# make sure .env.properties exists for the build
RUN touch src/main/resources/.env.properties
RUN chmod +x mvnw && ./mvnw clean package -DskipTests

# stage 2: runtime
FROM openjdk:23-jdk-slim
WORKDIR /app

COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]