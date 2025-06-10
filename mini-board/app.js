const http =require('http');
const fs =require('fs');
const ejs =require('ejs');
const url =require('url');
const qs =require('querystring');



const index_page =fs.readFileSync('./index.ejs','utf-8');
const login_page =fs.readFileSync('./login.ejs','utf-8');

const max_num = 10; // 最大表示件数
const filename ='mydata.txt';
var message_data;
readFromFile(filename);

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
                response_index(request,response);
                break;
        case '/login':
                response_login(request,response);
                break;
        default:
            response.writeHead(404,{'Content-Type':'text/html'});
            response.write('<h1>404 Not Found</h1>');
            response.end();
            break;
        }
}


// Indexページのレスポンスを生成する関数
function response_index(request,response){
            if(request.method === 'POST'){
                // POSTリクエストの処理
                var body = '';
                request.on('data', function(data) {
                    body += data;
                });
                request.on('end', ()=> {
                    data = qs.parse(body);
                    addToData(data.id, data.msg, filename, () => {
                        response.writeHead(302, { 'Location': '/' });
                        response.end();
                    });
                });
            }
            else {
                // GETリクエストの処理
                write_index(request,response);
            }
}

function write_index(request,response){
    var msg ="※何かメッセージを書いてください";
    var content =ejs.render(index_page,{
        title:"Index",
        content:msg,
        data:message_data,
        filename:'./index.ejs', // 実際のテンプレートパスを指定する
        });
    response.writeHead(200,{'Content-Type':'text/html'});
    response.write(content);
    response.end();
}

function response_login(request,response){
    var content =ejs.render(login_page,{});
    response.writeHead(200,{'Content-Type':'text/html'});
    response.write(content);
    response.end();
}


function readFromFile(fname) {
    fs.readFile(fname, 'utf-8', (err, data) => {
        if (err) {
            console.error('ファイルの読み込みに失敗しました:', err);
            message_data = [];
        } else {
            message_data = data.split('\n').filter(line => line.trim() !== '');
        }
    });
}

function addToData(id,msg,fname,callback){
    var obj ={
        'id': id,
        'msg': msg,
    };
    var obj_str =JSON.stringify(obj);
    console.log('add data:'+ obj_str);
    // message_data が未定義の場合 (初回起動時など readFromFile より先に呼ばれるケース) を考慮
    if (!Array.isArray(message_data)) {
        message_data = [];
    }
    message_data.unshift(obj_str); // 新しいメッセージを配列の先頭に追加
    if (message_data.length > max_num) {
        message_data.pop(); // 最後の要素を削除
    }
    saveTofile(fname, callback);
}

function saveTofile(fname, callback) {
    var data_str =message_data.join('\n');
    fs.writeFile(fname, data_str, 'utf-8', (err) => {
        if (err) {
            console.error('ファイルの書き込みに失敗しました:', err);
        } else {
            console.log('ファイルに保存しました:', fname);
        }
        if (callback) {
            callback();
        }
    });
};