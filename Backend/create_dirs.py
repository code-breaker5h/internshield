import os

# Create the directories
lib_dir = r'c:\Users\Naman\OneDrive\Desktop\InterShield\lib'
api_dir = r'c:\Users\Naman\OneDrive\Desktop\InterShield\pages\api'

os.makedirs(lib_dir, exist_ok=True)
os.makedirs(api_dir, exist_ok=True)

print(f"Created: {lib_dir}")
print(f"Created: {api_dir}")
