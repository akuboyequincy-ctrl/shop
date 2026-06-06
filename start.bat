@echo off
echo.
echo ====================================
echo ShopZone Server - Quick Start
echo ====================================
echo.

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
    if errorlevel 1 (
        echo ERROR: npm install failed
        pause
        exit /b 1
    )
)

echo.
echo Starting server...
echo.
echo ====================================
echo Server running at: http://localhost:3000
echo Admin Login: Nii / 11223344
echo ====================================
echo.

node server.js
pause
