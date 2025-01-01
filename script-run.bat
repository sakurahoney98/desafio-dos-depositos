@echo off
:: Obtém o endereço IP local automaticamente
for /f "tokens=2 delims=:" %%i in ('ipconfig ^| findstr /i "IPv4"') do (
    for /f "tokens=*" %%j in ("%%i") do set ip=%%j
)

:: Remove espaços em branco do início da variável IP (se existirem)
set ip=%ip:~0%

:: Navega até o diretório do projeto
cd "C:\Users\User\Pictures\Desafio"

:: Exibe a URL com o IP dinâmico
echo Executando em: http://%ip%:1000/
echo Para finalizar aperte CTRL + C

:: Executa o script Python
python app.py

:: Pausa para que o terminal não feche automaticamente
pause
