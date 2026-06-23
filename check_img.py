import sys
from PIL import Image

try:
    path = r"C:\Users\ks209\Downloads\decorator-kunal-main\decorator-kunal-main\Decorlab Logo\Decorlab Logo\Logo\Decorlab final-05.png"
    img = Image.open(path).convert("RGBA")
    w, h = img.size
    print(f"Size: {w}x{h}")
    
    # Sample corners
    print(f"Top-Left: {img.getpixel((0,0))}")
    print(f"Top-Right: {img.getpixel((w-1,0))}")
    print(f"Bottom-Left: {img.getpixel((0,h-1))}")
    print(f"Bottom-Right: {img.getpixel((w-1,h-1))}")
    
    # Check center pixel
    print(f"Center: {img.getpixel((w//2, h//2))}")
except Exception as e:
    print(f"Error: {e}")
