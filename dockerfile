FROM  node 
EXPOSE 1234
RUN cd ./server
RUN npm install 
RUN cd ../
CMD ["node","./server/index.js"]
