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
# 클릭 요소 그림의 모양(32×32 칸, 그려진 곳=1) — 투명한 곳은 눌러도 뒤의 요소로 넘어간다
masks = {}
for f in sorted((root / 'assets' / 'el').glob('*.webp')):
    a = Image.open(f).convert('RGBA').getchannel('A').resize((32, 32), Image.BILINEAR)
    bits = ''.join('1' if a.getpixel((x, y)) > 60 else '0' for y in range(32) for x in range(32))
    masks['el/' + f.stem] = format(int(bits, 2), '0256x')
js = '/* 자동 생성 (tools/gen_art_sizes.py) — 손으로 고치지 않는다. 있는 그림 목록과 크기. */\n(function () {\n  window.EF.ART_FILES = ' + json.dumps(sizes, ensure_ascii=False, separators=(',', ':')) + ';\n  window.EF.ART_MASKS = ' + json.dumps(masks, separators=(',', ':')) + ';\n})();\n'
(root / 'src/data/art-sizes.js').write_text(js, encoding='utf-8')
print(len(sizes), 'images')
