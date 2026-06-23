import sys
from PIL import Image

try:
    Image.MAX_IMAGE_PIXELS = None # disable decompression bomb limit
    path = r"C:\Users\ks209\Downloads\decorator-kunal-main\decorator-kunal-main\Decorlab Logo\Decorlab Logo\Logo\Decorlab final-05.png"
    out_path = r"C:\Users\ks209\Downloads\decorator-kunal-main\decorator-kunal-main\public\assets\Decorlab-final-05-trans.webp"
    
    print("Loading image...")
    img = Image.open(path).convert("RGBA")
    
    # Resize to a web-friendly size (e.g. max height 200)
    w, h = img.size
    new_h = 200
    new_w = int((new_h / h) * w)
    print(f"Resizing from {w}x{h} to {new_w}x{new_h}...")
    img = img.resize((new_w, new_h), Image.Resampling.LANCZOS)
    
    datas = img.getdata()
    newData = []
    
    bg_color = (255, 255, 255)
    tolerance = 20
    
    print("Removing background...")
    for item in datas:
        # Check if pixel is close to white
        if (item[0] > 255 - tolerance and
            item[1] > 255 - tolerance and
            item[2] > 255 - tolerance):
            # Transparent
            newData.append((255, 255, 255, 0))
        else:
            newData.append(item)
            
    img.putdata(newData)
    
    print("Saving webp...")
    img.save(out_path, "WEBP", quality=90)
    print("Success")
except Exception as e:
    print(f"Error: {e}")
