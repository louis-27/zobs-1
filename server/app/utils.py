import hashlib
import PyPDF2

def pdf2text(f):
    reader = PyPDF2.PdfFileReader(open(f, 'rb'))
    res = ''
    for i in range(reader.getNumPages()):
        page = reader.getPage(i)
        text = page.extractText()
        res += text
    return res

def hash_file(f):
    h = hashlib.sha1()
    chunk = 0
    while chunk != b'':
        chunk = f.read(1024)
        h.update(chunk)
    return h.hexdigest()
