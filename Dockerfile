FROM node:18-bullseye-slim

COPY package.json package.json
COPY node_modules node_modules
COPY .next .next
COPY public public

CMD ["npm", "run", "start"]