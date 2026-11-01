# stage 1: build
FROM eclipse-temurin:23-jdk AS build
WORKDIR /app

COPY pom.xml .
COPY mvnw .
COPY .mvn .mvn
COPY src src

# make sure .env.properties exists for the build
RUN touch src/main/resources/.env.properties
RUN chmod +x mvnw && ./mvnw clean package -DskipTests

# stage 2: runtime
FROM eclipse-temurin:23-jre
WORKDIR /app

COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
# keep total JVM memory under Render's 512Mi limit
ENTRYPOINT ["java", "-XX:+UseSerialGC", "-XX:MaxRAMPercentage=40", "-Xss512k", "-XX:MaxMetaspaceSize=192m", "-XX:ReservedCodeCacheSize=64m", "-XX:TieredStopAtLevel=1", "-jar", "app.jar"]