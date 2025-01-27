import PyPDF2
import xml.etree.ElementTree as ET
from docx import Document
from striprtf.striprtf import rtf_to_text

def read_txt(filename:str) -> str:
    with open(filename, 'r', encoding='utf-8') as file:
        file_content = file.read()
    return file_content

def read_rtf(filename:str) -> str:
    with open(filename, 'r') as file:
        rtf_content = file.read()
        file_content = rtf_to_text(rtf_content, encoding='utf-8')
    return file_content

def read_pdf(filename:str) -> str:
    with open(filename, 'rb') as file:
        pdf_reader = PyPDF2.PdfReader(file)
        pdf_content = [pdf_reader.pages[i].extract_text() for i in range(len(pdf_reader.pages))]
        file_content = " ".join(pdf_content)
    return file_content

def read_docx(filename:str) -> str:
    with open(filename, 'rb') as file:
        document = Document(file)
        docx_content = [paragraph.text for paragraph in document.paragraphs]
        file_content = "\n".join(docx_content)
    return file_content

def read_xml(filename:str) -> str:
    tree = ET.parse(filename)
    root = tree.getroot()
    file_content = ET.tostring(root, method='xml').decode('utf-8')
    return file_content