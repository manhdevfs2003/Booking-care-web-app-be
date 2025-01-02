FROM node:14-alpine

# Thiết lập thư mục làm việc
WORKDIR /hoidanit/backend

# Sao chép file package.json và cài đặt dependencies
COPY package*.json ./
RUN npm install 

# Cài đặt Babel CLI toàn cục
RUN npm install -g @babel/core @babel/cli

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Build mã nguồn
RUN npm run build-src

# Chạy ứng dụng đã biên dịch
CMD ["npm", "run", "build"]
