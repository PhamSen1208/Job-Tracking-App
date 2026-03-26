#xây cho FE stage 1
# cài đặt môi trường 
FROM node:20 AS build-frontend
WORKDIR /frontend

#copy package và cài thư viện node_modules
COPY package*.json ./
RUN npm ci

#copy code

COPY . .
RUN npm run build


#Xây nhà cho BE stage 2
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-backend
WORKDIR /backend

#copy và restore các file cấu hình C#
COPY ["Jobster.csproj", "./"]
RUN dotnet restore "Jobster.csproj"

#Build và publish BE
COPY . .
RUN dotnet publish "Jobster.csproj" -c Release -o /app/publish

#nhặt thư mục dist của FE vừa build rồi nhé vô wwwroot của BE .net

COPY --from=build-frontend /frontend/dist /app/publish/wwwroot

#Chạy ứng dụng .NET stage 3
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app

#copy các thứ làm ở stage 2
COPY --from=build-backend /app/publish .

#mở cổng 80
EXPOSE 8080

#Chạy BE
ENTRYPOINT ["dotnet", "Jobster.dll"]

