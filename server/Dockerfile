# stage 1: build
FROM openjdk:19-jdk AS build
WORKDIR /app

# copy project files
COPY pom.xml .
COPY mvnw .
COPY .mvn .mvn
COPY src src

# grant execute permission and build the project
RUN chmod +x mvnw && ./mvnw clean package -DskipTests

# stage 2: runtime
FROM openjdk:19-jdk-slim
WORKDIR /app

# copy only the JAR
COPY --from=build /app/target/*.jar app.jar

# expose port and run
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
