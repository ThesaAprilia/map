@echo off
:loop

:: Ambil jam saat ini (format 24 jam)
for /f "tokens=1 delims=:" %%a in ('time /t') do set hour=%%a
if %hour% LSS 10 set hour=0%hour%

echo [INFO] Jam sekarang: %hour%

:: Cek apakah dalam jam kerja
if %hour% GEQ 08 if %hour% LEQ 16 (
    echo [ACTION] Menjalankan "npx playwright test"...

    :: Jalankan test dan abaikan error
    call npx playwright test || echo [WARNING] Playwright gagal, lanjut loop

    echo [INFO] Menunggu 1 menit sebelum menjalankan ulang...
    timeout /t 60 >nul

    goto loop
) else (
    echo [INFO] Di luar jam kerja (08:00 - 16:00). Script dihentikan.
    goto end
)

:end
echo [INFO] Selesai. Tekan tombol apa pun untuk keluar.
pause