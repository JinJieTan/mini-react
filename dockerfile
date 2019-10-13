FROM  node 
EXPOSE 1234
ADD . /react
WORKDIR /react
RUN cd ./server
RUN npm install 
RUN cd ../
CMD ["node","./server/index.js"]
