require 'webrick' 

op = { BindAddress:  "127.0.0.1", Port: 9999, DocumentRoot: "." }
s = WEBrick::HTTPServer.new(op)
s.start
