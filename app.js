const http =require('http');
const fs =require('fs');
const ejs =require('ejs');
const url =require('url');
const qs =require('querystring');



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

function getFromClient(request, response) {
    var url_parts = url.parse(request.url,true);
    switch(url_parts.pathname){
        case '/':
                response_index(request,response,url_parts);
                break;
        case '/other':
                response_other(request,response);
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

var data = {
    'Taro':'090-999-999',
    'Hanako':'080-888-888',
    'Sachiko':'070-777-777',
    'Ichiro':'060-666-666'
};

var data2 = {
    'Taro':['taro@yamada','090-999-999','Tokyo'],
    'Hanako':['hanako@flower','080-888-888','Yokohama'],
    'Sachiko':['sachiko@happy','070-777-777','Nagoya'],
    'Ichiro':['ichiro@baseball','060-666-666','USA']
};

// Indexページのレスポンスを生成する関数
function response_index(request,response,url_parts){
            var msg ="これはIndexページです。";
            var content =ejs.render(index_page,{
            title:"Index",
            content:msg,
            data:data,
            filename:'data_item',
            });
            response.writeHead(200,{'Content-Type':'text/html'});
            response.write(content);
            response.end();
}

function response_other(request,response){
    var msg ="これはOtherページです。";
    var content =ejs.render(index_page,{
        title:"Index",
        content:msg,
        data:data2,
        filename:'data_item',
        });
    response.writeHead(200,{'Content-Type':'text/html'});
    response.write(content);
    response.end();
    };