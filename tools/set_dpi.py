"""assets/ 안 webp 그림에 해상도 정보(기본 75dpi)를 넣는다. 그림 자체는 다시 압축하지 않는다(화질 그대로).
   사용: python3 tools/set_dpi.py [dpi]"""
import struct, sys, pathlib
from PIL import Image
DPI = int(sys.argv[1]) if len(sys.argv) > 1 else 75
root = pathlib.Path(__file__).resolve().parent.parent / 'assets'

def exif_bytes(dpi):
    # TIFF(little endian) 머리 + IFD0: XResolution, YResolution, ResolutionUnit(인치)
    ifd = [(0x011A, 5, 1, None), (0x011B, 5, 1, None), (0x0128, 3, 1, 2)]
    head = b'II*\x00' + struct.pack('<I', 8)
    n = len(ifd); data_off = 8 + 2 + n * 12 + 4
    entries, extra = b'', b''
    for tag, typ, cnt, val in ifd:
        if typ == 5:
            entries += struct.pack('<HHII', tag, typ, cnt, data_off + len(extra)); extra += struct.pack('<II', dpi, 1)
        else:
            entries += struct.pack('<HHIHH', tag, typ, cnt, val, 0)
    return head + struct.pack('<H', n) + entries + struct.pack('<I', 0) + extra

def chunks(b):
    i = 12
    while i < len(b):
        fourcc, size = b[i:i+4], struct.unpack('<I', b[i+4:i+8])[0]
        yield fourcc, b[i+8:i+8+size]; i += 8 + size + (size & 1)

def pack(fourcc, data): return fourcc + struct.pack('<I', len(data)) + data + (b'\x00' if len(data) & 1 else b'')

done = 0
for p in sorted(root.rglob('*.webp')):
    b = p.read_bytes(); cs = [(f, d) for f, d in chunks(b) if f != b'EXIF']
    if cs[0][0] == b'VP8X':
        flags = cs[0][1][0] | 0x08; vp8x = bytes([flags]) + cs[0][1][1:]; rest = cs[1:]
    else:
        w, h = Image.open(p).size; has_alpha = any(f == b'ALPH' for f, _ in cs)
        flags = 0x08 | (0x10 if has_alpha else 0)
        vp8x = bytes([flags, 0, 0, 0]) + (w - 1).to_bytes(3, 'little') + (h - 1).to_bytes(3, 'little'); rest = cs
    body = pack(b'VP8X', vp8x) + b''.join(pack(f, d) for f, d in rest) + pack(b'EXIF', exif_bytes(DPI))
    p.write_bytes(b'RIFF' + struct.pack('<I', 4 + len(body)) + b'WEBP' + body); done += 1
print(done, 'files ->', DPI, 'dpi')
