from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import urlparse, parse_qs


class MyHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        parsed = urlparse(self.path)
        path = parsed.path

        if path == "/hello":
            params = parse_qs(parsed.query)
            name = params.get("name", ["世界"])[0]
            body = f"<h1>你好，{name}！</h1><a href='/'>返回</a>"
        else:
            body = """
            <form method="GET" action="/hello">
                <input type="text" name="name" placeholder="输入你的名字">
                <button type="submit">提交</button>
            </form>
            """

        self.send_response(200)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.end_headers()
        self.wfile.write(body.encode("utf-8"))

if __name__ == "__main__":
    server = HTTPServer(("127.0.0.1", 8000), MyHandler)
    print("服务器启动：http://127.0.0.1:8000")
    server.serve_forever()