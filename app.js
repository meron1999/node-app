const http =require('http');

var server =http.createServer(
    (request,response)=>{
        response.end('<html><body><h1>Hello</h1><p>Welcome to Node.js </p></body></html>');
    }
);

const PORT = 3000; // ポート番号を変数にしておくと便利です
server.listen(PORT, () => {
    // サーバーが正常に起動し、ポートの待ち受けを開始したときに実行される
    console.log(`Server running at http://localhost:${PORT}/`);
    console.log('サーバーが起動しました。Ctrl+Cで停止できます。');
});