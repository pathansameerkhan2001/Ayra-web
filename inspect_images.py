import os
import shutil
from PIL import Image

uploaded_dir = r"C:\Users\Welcome\.gemini\antigravity-ide\brain\d0813184-fe6a-4501-961c-ee2d088fda2c\.user_uploaded"
files = os.listdir(uploaded_dir)
output_info = []

for f in files:
    full_path = os.path.join(uploaded_dir, f)
    img = Image.open(full_path)
    output_info.append(f"{f}: {img.size}, mode={img.mode}, format={img.format}")

with open("image_info.txt", "w") as out:
    out.write("\n".join(output_info))

print("Done writing image info")
