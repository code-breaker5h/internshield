#!/usr/bin/env python3
import os
import sys

methods_tried = []

# Method 1: Python os.makedirs
try:
    os.makedirs(r'c:\Users\Naman\OneDrive\Desktop\InterShield\lib', exist_ok=True)
    os.makedirs(r'c:\Users\Naman\OneDrive\Desktop\InterShield\pages\api', exist_ok=True)
    
    # Verify
    if os.path.isdir(r'c:\Users\Naman\OneDrive\Desktop\InterShield\lib'):
        methods_tried.append("✓ Python os.makedirs - SUCCESS")
    if os.path.isdir(r'c:\Users\Naman\OneDrive\Desktop\InterShield\pages\api'):
        if "Python os.makedirs" not in methods_tried[0] if methods_tried else False:
            methods_tried.append("✓ Python os.makedirs - SUCCESS (both directories)")
except Exception as e:
    methods_tried.append(f"✗ Python os.makedirs - FAILED: {e}")

print("\n".join(methods_tried))
