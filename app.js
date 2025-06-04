const http =require('http');

var server =http.createServer(
    (request,response)=>{
        response.setHeader('Content-Type','text/html');
        response.write('<!DOCTYPE html><html lang="ja">');
        response.write('<head><meta charset="utf-8">');
        response.write('<title>Hello</title>');
        response.write('</head>');
        response.write('<body>');
        response.write('<h1>Hello Node.js!</h1>');
        response.write('<p>This is my first Node.js server.</p>');
        response.write('<p>これは私の初めてのnode.jsサーバーです</p>','utf-8');
        response.write('</body>');
        response.write('</html>')
    }
);

const PORT = 3000; // ポート番号を変数にしておくと便利です
server.listen(PORT, () => {
    // サーバーが正常に起動し、ポートの待ち受けを開始したときに実行される
    console.log(`Server running at http://localhost:${PORT}/`);
    console.log('サーバーが起動しました。Ctrl+Cで停止できます。');
});