'''
Author: xiuquanxu
Company: kaochong
Date: 2021-06-10 00:25:33
LastEditors: xiuquanxu
LastEditTime: 2021-06-10 23:49:51
'''
import socket
import tkinter
# import ssl
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

    # if scheme == "https":
    #     ctx = ssl.create_default_context()
    #     s = ctx.wrap_socket(s, server_hostname=host)
    
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

def lex(body):
    text = ""
    in_angle = False
    print("show \r\n")
    # 代表不要标签<Button>123</Button>，不要Button这样的标签，只要里面的123文字
    for c in body:
        if c == "<":
            in_angle = True
        elif c == ">":
            in_angle = False
        elif not in_angle:
            text += c
    return text

def layout(text):
    display_list = []
    cursor_x, cursor_y = HSTEP, VSTEP
    for c in text:
        display_list.append((cursor_x, cursor_y, c))
        cursor_x += HSTEP
        if cursor_x >= WIDTH - HSTEP:
            cursor_y += VSTEP
            cursor_x = HSTEP
    return display_list

WIDTH, HEIGHT = 800, 600
HSTEP, VSTEP = 13, 18

SCROLL_STEP = 100

# https://www.zggdwx.com/xiyou/1.html 西游记文章资源

class Browser:
    def __init__(self):
        self.window = tkinter.Tk()
        self.canvas = tkinter.Canvas(
            self.window,
            width=WIDTH,
            height=HEIGHT
        )
        self.canvas.pack()

        self.scroll = 0
        self.window.bind("<Down>", self.scrolldown)
        self.window.bind("<Up>", self.scrollup)

    def load(self, url):
        headers, body = request(url)
        text = lex(body)
        self.display_list = layout(text)
        self.draw()
    
    def draw(self):
        self.canvas.delete("all")
        for x, y, c in self.display_list:
            if y > self.scroll + HEIGHT : continue
            if y + VSTEP < self.scroll : continue
            self.canvas.create_text(x, y - self.scroll, text=c)
    
    def scrolldown(self, e):
        self.scroll += SCROLL_STEP
        self.draw()

    def scrollup(self, e):
        self.scroll -= SCROLL_STEP
        self.draw()
       
if __name__ == "__main__":
    import sys
    Browser().load(sys.argv[1])
    tkinter.mainloop()
    