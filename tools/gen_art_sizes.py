"""assets/ 안 그림들의 가로·세로 크기를 src/data/art-sizes.js 로 적는다. 그림을 바꾸거나 더하면 다시 실행: python3 tools/gen_art_sizes.py"""
import os, json, pathlib
from PIL import Image
root = pathlib.Path(__file__).resolve().parent.parent
sizes = {}
for d in sorted((root / 'assets').iterdir()):
    if not d.is_dir(): continue
    for f in sorted(d.iterdir()):
        if f.suffix.lower() in ('.webp', '.png', '.jpg'):
            sizes[f'{d.name}/{f.stem}'] = list(Image.open(f).size)
js = '/* 자동 생성 (tools/gen_art_sizes.py) — 손으로 고치지 않는다. 있는 그림 목록과 크기. */\n(function () {\n  window.EF.ART_FILES = ' + json.dumps(sizes, ensure_ascii=False, separators=(',', ':')) + ';\n})();\n'
(root / 'src/data/art-sizes.js').write_text(js, encoding='utf-8')
print(len(sizes), 'images')
