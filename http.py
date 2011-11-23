import SimpleHTTPServer,SocketServer 
H = SimpleHTTPServer.SimpleHTTPRequestHandler 
d = SocketServer.TCPServer(("", 8019), H) 
d.serve_forever()
