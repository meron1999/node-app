const http =require('http');
const fs =require('fs');
const ejs =require('ejs');
const url =require('url');


const index_page =fs.readFileSync('./index.ejs','utf-8');
const other_page =fs.readFileSync('./other.ejs','utf-8');
const style_css =fs.readFileSync('./style.css','utf-8');


var server =http.createServer(getFromClient);

const PORT = 3000; // ポート番号を変数にしておくと便利です
server.listen(PORT, () => {
    // サーバーが正常に起動し、ポートの待ち受けを開始したときに実行される
    console.log(`Server running at http://localhost:${PORT}/`);
    console.log('サーバーが起動しました。Ctrl+Cで停止できます。');
});

function getFromClient(req, response) {
    var url_parts = url.parse(req.url);
    switch(url_parts.pathname){
        case '/':
            var Content =ejs.render(index_page,{
        title:"Index",
        content:"これはテンプレート使用したページです。",
        });
        response.writeHead(200,{'Content-Type':'text/html'});
        response.write(Content);
        response.end();
        break;
        case '/other':
            var Content =ejs.render(other_page,{
        title:"Other",
        content:"これは新しいページです。",
        });
        response.writeHead(200,{'Content-Type':'text/html'});
        response.write(Content);
        response.end();
        break;
        case '/style.css':
            response.writeHead(200,{'Content-Type':'text/css'});
            response.write(style_css);
            response.end();
            break;
        default:
            response.writeHead(404,{'Content-Type':'text/html'});
            response.write('<h1>404 Not Found</h1>');
            response.end();
            break;
        }
}