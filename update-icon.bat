@echo off
echo ========================================
echo    CHATNOW APK ICON GUNCELLEYICI
echo ========================================
echo.
echo Resimleri kopyalamak istiyor musunuz?
echo E - Evet, icon dosyalarini kopyala
echo H - Hayir, sadece APK olustur
echo.
set /p copy_choice="Seciminiz (E/H): "
if /i "%copy_choice%"=="E" (
    echo.
    echo Icon guncelleniyor...
    copy "assets\images\icon.png" "android\app\src\main\res\mipmap-hdpi\ic_launcher.png"
    copy "assets\images\icon.png" "android\app\src\main\res\mipmap-mdpi\ic_launcher.png"
    copy "assets\images\icon.png" "android\app\src\main\res\mipmap-xhdpi\ic_launcher.png"
    copy "assets\images\icon.png" "android\app\src\main\res\mipmap-xxhdpi\ic_launcher.png"
    copy "assets\images\icon.png" "android\app\src\main\res\mipmap-xxxhdpi\ic_launcher.png"
    copy "assets\images\icon.png" "android\app\src\main\res\mipmap-hdpi\ic_launcher_round.png"
    copy "assets\images\icon.png" "android\app\src\main\res\mipmap-mdpi\ic_launcher_round.png"
    copy "assets\images\icon.png" "android\app\src\main\res\mipmap-xhdpi\ic_launcher_round.png"
    copy "assets\images\icon.png" "android\app\src\main\res\mipmap-xxhdpi\ic_launcher_round.png"
    copy "assets\images\icon.png" "android\app\src\main\res\mipmap-xxxhdpi\ic_launcher_round.png"
    echo Icon guncellendi!
) else if /i "%copy_choice%"=="H" (
    echo.
    echo Icon kopyalanmadi, mevcut iconlar kullanilacak.
) else (
    echo.
    echo Gecersiz secim! Program kapaniyor...
    pause
    exit /b 1
)
echo APK olusturuluyor...
cd android
call gradlew.bat assembleRelease
cd ..
if %errorlevel% neq 0 (
    echo APK olusturma hatasi! Program kapaniyor...
    pause
    exit /b 1
)
echo.
echo ========================================
echo APK basariyla olusturuldu!
echo ========================================
echo.
echo Telefona yuklemek ister misiniz?
echo E - Evet, telefona yukle
echo H - Hayir, sadece APK olustur
echo.
set /p choice="Seciminiz (E/H): "
if /i "%choice%"=="E" (
    echo.
    echo APK telefona yukleniyor...
    adb install -r android\app\build\outputs\apk\release\app-release.apk
    if %errorlevel% equ 0 (
        echo.
        echo ========================================
        echo APK basariyla telefona yuklendi!
        echo ========================================
    ) else (
        echo.
        echo HATA: Telefona yukleme basarisiz!
        echo Telefon bagli mi? USB Debugging acik mi?
    )
) else if /i "%choice%"=="H" (
    echo.
    echo APK olusturuldu ama telefona yuklenmedi.
    echo APK konumu: android\app\build\outputs\apk\release\app-release.apk
) else (
    echo.
    echo Gecersiz secim! Program kapaniyor...
)
echo.
pause
