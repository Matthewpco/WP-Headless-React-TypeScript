FROM node:16-alpine as dependencies
WORKDIR /trd-front-end
COPY package.json package-lock.json ./
RUN npm install --force

FROM node:16-alpine as builder
WORKDIR /trd-front-end
COPY . .
COPY --from=dependencies /trd-front-end/node_modules ./node_modules
RUN npm run build

FROM node:16-alpine as runner
WORKDIR /trd-front-end
ENV NODE_ENV production
COPY --from=builder /trd-front-end/next.config.js ./next.config.js
COPY --from=builder /trd-front-end/public ./public
COPY --from=builder /trd-front-end/.next ./.next
COPY --from=builder /trd-front-end/package.json ./package.json
RUN npm install --omit=dev --force

EXPOSE 3000
CMD ["npm", "run", "start"]
