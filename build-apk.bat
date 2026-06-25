@echo off
echo ========================================
echo   Vird Islamic App - APK Builder
echo ========================================
echo.

SET NODE_PATH=C:\Program Files\nodejs
SET PATH=%NODE_PATH%;%PATH%

echo [1/3] Building React app...
call npm run build
if %errorlevel% neq 0 ( echo BUILD FAILED & pause & exit )

echo.
echo [2/3] Syncing to Android...
call npx cap sync android
if %errorlevel% neq 0 ( echo SYNC FAILED & pause & exit )

echo.
echo [3/3] Building APK...
cd android
call gradlew.bat assembleDebug
cd ..

echo.
echo ========================================
if exist "android\app\build\outputs\apk\debug\app-debug.apk" (
  echo SUCCESS! APK is at:
  echo android\app\build\outputs\apk\debug\app-debug.apk
  echo.
  echo Copy this file to your phone and install it!
) else (
  echo APK build may have failed - check above for errors
  echo Make sure Android Studio + JDK 17 is installed
)
echo ========================================
pause
