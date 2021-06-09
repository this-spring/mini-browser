'''
Author: xiuquanxu
Company: kaochong
Date: 2021-06-10 00:25:33
LastEditors: xiuquanxu
LastEditTime: 2021-06-10 01:00:31
'''
import socket
# python3 1.1.py http://example.org/

def request(url):
    scheme, url = url.split("://", 1)
    print(" scheme:", scheme, " url:", url)
    assert scheme in ["http", "https"], \
        "Unknown scheme {}".format(scheme)
    host = ''
    path = ''
    if ("/" in url):
        host, path = url.split("/", 1)
        path = "/" + path
    else:
        host = url
        path = '/'

    port = 80

    if (scheme == "http"):
        port = 80
    else:
        port = 443
    
    if ":" in host:
        host, port = host.split(":", 1)
        port = int(port)

    print(" host:", host, " path:", path, " port:", port)

    s = socket.socket(
        family=socket.AF_INET,
        type=socket.SOCK_STREAM,
        proto=socket.IPPROTO_TCP,
    )
    s.connect((host, port))

    
    print(" socket connect host:", host, " port:", port, " path:", path)
    s.send(("GET {} HTTP/1.0\r\n".format(path) +
        "Host: {}\r\n\r\n".format(host)).encode("utf8"))
    response = s.makefile("r", encoding="utf8", newline="\r\n")

    print("response:", response)
    statusline = response.readline()
    version, status, explanation = statusline.split(" ", 2)
    assert status == "200", "{}: {}".format(status, explanation)

    headers = {}
    while True:
        line = response.readline()
        if line == "\r\n": break
        header, value = line.split(":", 1)
        headers[header.lower()] = value.strip()

    body = response.read()
    s.close()

    # print(" return ÷header:", headers, " body:", body)
    return headers, body

def show(body):
    in_angle = False
    print("show \r\n")
    # 代表不要标签<Button>123</Button>，不要Button这样的标签，只要里面的123文字
    for c in body:
        if c == "<":
            in_angle = True
        elif c == ">":
            in_angle = False
        elif not in_angle:
            print(c, end="")    

def load(url):
    request(url)
    headers, body = request(url)
    show(body)

if __name__ == "__main__":
    import sys
    load(sys.argv[1])