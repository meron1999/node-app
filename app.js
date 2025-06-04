const http =require('http');
const fs =require('fs');


var server =http.createServer(
    (request,response)=>{
       fs.readFile('./index.html','utf-8',
        (err,data)=>{
        response.writeHead(200,{'Content-Type':'text/html'});
        response.write(data);
        response.end();
        });
    }
);

const PORT = 3000; // ポート番号を変数にしておくと便利です
server.listen(PORT, () => {
    // サーバーが正常に起動し、ポートの待ち受けを開始したときに実行される
    console.log(`Server running at http://localhost:${PORT}/`);
    console.log('サーバーが起動しました。Ctrl+Cで停止できます。');
});