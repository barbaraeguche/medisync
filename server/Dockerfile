## stage 1: build
#FROM openjdk:19-jdk AS build
#WORKDIR /app
#
## copy project files
#COPY pom.xml .
#COPY mvnw .
#COPY .mvn .mvn
#COPY src src
#
## grant execute permission and build the project
#RUN chmod +x mvnw && ./mvnw clean package -DskipTests
#
## stage 2: runtime
#FROM openjdk:19-jdk-slim
#WORKDIR /app
#
## copy only the JAR
#COPY --from=build /app/target/*.jar app.jar
#
## expose port and run
#EXPOSE 8080
#ENTRYPOINT ["java", "-jar", "app.jar"]


# Importing JDK and copying required files
FROM openjdk:19-jdk AS build
WORKDIR /app
COPY pom.xml .
COPY src src

# Copy Maven wrapper
COPY mvnw .
COPY .mvn .mvn

# Set execution permission for the Maven wrapper
RUN chmod +x ./mvnw
RUN ./mvnw clean package -DskipTests

# Stage 2: Create the final Docker image using OpenJDK 19
FROM openjdk:19-jdk
VOLUME /tmp

# Copy the JAR from the build stage
COPY --from=build /app/target/*.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
EXPOSE 8080