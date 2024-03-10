# Build Stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /source

# Copy everything and build the project
COPY . ./
RUN dotnet restore "api.csproj" --disable-parallel
# All of the artifacts will end up in the /app
RUN dotnet publish "api.csproj" -c Release -o /app --no-restore

# Serve Stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0	
WORKDIR /app
COPY --from=build /app ./

# The application will use the port defined in the PORT environment variable
EXPOSE $PORT

ENTRYPOINT ["dotnet", "api.dll"]