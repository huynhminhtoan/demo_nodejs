# App này chạy CHUNG với nginx chính của cả hệ thống (service "proxy" trong
# docker-compose.yml gốc) - không tự làm HTTPS/TLS riêng nữa, không tự bind
# cổng 80/443 nữa. Container này chỉ build ra dist/ rồi đổ vào volume dùng chung.

# ---------- Stage 1: Build ứng dụng Vue/Vite ----------
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# ---------- Stage 2: chỉ để đổ dist/ ra volume /output rồi thoát ----------
FROM alpine:3.20
COPY --from=build /app/dist /dist
CMD ["sh", "-c", "rm -rf /output/* && cp -r /dist/. /output/ && echo 'Da copy dist sang /output'"]
