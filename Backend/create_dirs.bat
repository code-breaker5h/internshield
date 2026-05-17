@echo off
REM Method 1: Using mkdir
echo Attempting mkdir method...
mkdir "c:\Users\Naman\OneDrive\Desktop\InterShield\lib" 2>nul
mkdir "c:\Users\Naman\OneDrive\Desktop\InterShield\pages\api" 2>nul

REM Check if directories exist
if exist "c:\Users\Naman\OneDrive\Desktop\InterShield\lib" (
    echo SUCCESS: mkdir created lib directory
) else (
    echo FAILED: mkdir did not create lib directory
)

if exist "c:\Users\Naman\OneDrive\Desktop\InterShield\pages\api" (
    echo SUCCESS: mkdir created pages\api directory
) else (
    echo FAILED: mkdir did not create pages\api directory
)
