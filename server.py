from http.server import HTTPServer, SimpleHTTPRequestHandler
from functools import partial

DIRECTORY = r"D:\PH"

Handler = partial(SimpleHTTPRequestHandler, directory=DIRECTORY)

server = HTTPServer(("localhost", 8067), Handler)

print("Serving:", DIRECTORY)
print("Open: http://localhost:8067")

server.serve_forever()