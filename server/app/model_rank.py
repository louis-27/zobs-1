import spacy
from spacy.matcher import PhraseMatcher
from app.utils import pdf2text

nlp = spacy.load('en_core_web_sm')

def model_rank(filename, requirements):
    requirements = ['management', 'business']
    # print('WOI PANTEK "{}" == "uploads/c8106a5d9eb786b8048d6c9ade0368fff6612d67.pdf"'.format(filename))
    # print("uploads/c8106a5d9eb786b8048d6c9ade0368fff6612d67.pdf" == filename)
    text = pdf2text(filename).strip().lower()
    words = [nlp(i) for i in requirements]

    matcher = PhraseMatcher(nlp.vocab)
    matcher.add('requirements', None, *words)

    score = len(matcher(nlp(text)))
    return score
