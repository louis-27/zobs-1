import nltk
import re

nltk.download('stopwords')
nltk.download('punkt')
nltk.download('averaged_perceptron_tagger')
nltk.download('maxent_ne_chunker')
nltk.download('words')

from nltk.corpus import stopwords
from app.utils import pdf2text

stop = stopwords.words('english')

def get_name(text):
    text = ''.join([i for i in text.split() if i not in stop])
    sentences = nltk.sent_tokenize(text)
    sentences = [nltk.word_tokenize(i) for i in sentences]
    sentences = [nltk.pos_tag(i) for i in sentences]

    names = []
    for tagged_sentence in sentences:
        for chunk in nltk.ne_chunk(tagged_sentence):
            if type(chunk) == nltk.tree.Tree:
                if chunk.label() == 'PERSON':
                    names.append(' '.join([c[0] for c in chunk]))
    return names

def get_email(text):
    r = re.compile(r'[\w\.-]+@[\w\.-]+')
    return r.findall(text)

def get_phone(text):
    r = re.compile(r'(\d{3}[-\.\s]??\d{3}[-\.\s]??\d{4}|\(\d{3}\)\s*\d{3}[-\.\s]??\d{4}|\d{3}[-\.\s]??\d{4})')
    numbers = r.findall(text)
    return [re.sub(r'\D', '', i) for i in numbers]

def get_details(filename):
    text = pdf2text(filename)

    name = get_name(text)
    email = get_email(text)
    phone = get_phone(text)
    res = {
        'name': '' if len(name) == 0 else name[0],
        'email': '' if len(email) == 0 else email[0],
        'phone': '' if len(phone) == 0 else phone[0],
    }
    return res

