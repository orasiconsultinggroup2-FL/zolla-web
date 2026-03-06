import zipfile, xml.etree.ElementTree as ET

# IMPACTO EN EL TERRENO
print("="*60)
print("DOCUMENTO: IMPACTO EN EL TERRENO")
print("="*60)
z = zipfile.ZipFile(r'IMPACTO EN EL TERRENO.docx')
root = ET.fromstring(z.read('word/document.xml'))
ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
for p in root.findall('.//w:p', ns):
    t = ' '.join([x.text for x in p.findall('.//w:t', ns) if x.text])
    if t.strip():
        print(t)
z.close()

print()
print("="*60)
print("DOCUMENTO: NUESTROS CLIENTES")
print("="*60)
z2 = zipfile.ZipFile(r'Nuestros clientes.docx')
root2 = ET.fromstring(z2.read('word/document.xml'))
for p in root2.findall('.//w:p', ns):
    t = ' '.join([x.text for x in p.findall('.//w:t', ns) if x.text])
    if t.strip():
        print(t)
z2.close()
