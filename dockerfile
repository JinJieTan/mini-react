FROM  node 
EXPOSE 1234
ADD . /react
WORKDIR /react
RUN cd ./server
RUN npm install 
RUN cd ../
RUN node ./server/index.js
