import re
import zipfile
from pathlib import Path
base = Path('doc')
files = sorted([p for p in base.iterdir() if p.suffix.lower() in ('.docx','.doc')])
print('Found', len(files), 'files')
for p in files:
    print('---', p.name)
    if p.suffix.lower() == '.docx':
        with zipfile.ZipFile(p, 'r') as z:
            if 'word/document.xml' in z.namelist():
                text = z.read('word/document.xml').decode('utf-8', errors='ignore')
                text = re.sub(r'<.*?>', ' ', text)
                text = re.sub(r'\s+', ' ', text).strip()
                print(text[:1200])
            else:
                print('no document.xml')
    else:
        print('binary .doc file; skipped')
