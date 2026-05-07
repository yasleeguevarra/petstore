# PetStore Backend Build and Run Script
param(
    [switch]$BuildOnly = $false,
    [switch]$SkipBuild = $false
)

# Set Java 17 environment
$JAVA_HOME = "C:\Program Files\Microsoft\jdk-17.0.19.10-hotspot"
$Env:JAVA_HOME = $JAVA_HOME
$Env:PATH = "$JAVA_HOME\bin;$Env:PATH"

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "PetStore Backend Build & Run" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# Verify Java
Write-Host "Checking Java 17 installation..." -ForegroundColor Yellow
& java -version 2>&1
Write-Host ""

# Download Maven if not exists
$MAVEN_HOME = "$PSScriptRoot\.maven"
$MAVEN_BIN = "$MAVEN_HOME\bin\mvn.cmd"

if (-not (Test-Path $MAVEN_BIN) -and -not $SkipBuild) {
    Write-Host "Downloading Maven 3.9.8..." -ForegroundColor Yellow
    
    if (-not (Test-Path $MAVEN_HOME)) {
        New-Item -ItemType Directory -Path $MAVEN_HOME -Force | Out-Null
    }
    
    $MavenUrl = "https://archive.apache.org/dist/maven/maven-3/3.9.8/binaries/apache-maven-3.9.8-bin.zip"
    $MavenZip = "$MAVEN_HOME\maven.zip"
    
    try {
        [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
        $client = New-Object System.Net.WebClient
        Write-Host "Downloading from: $MavenUrl" -ForegroundColor Gray
        $client.DownloadFile($MavenUrl, $MavenZip)
        
        Write-Host "Extracting Maven..." -ForegroundColor Yellow
        Expand-Archive -Path $MavenZip -DestinationPath $MAVEN_HOME -Force
        Move-Item -Path "$MAVEN_HOME\apache-maven-3.9.8\*" -Destination $MAVEN_HOME -Force
        Remove-Item -Path "$MAVEN_HOME\apache-maven-3.9.8" -Force
        Remove-Item -Path $MavenZip -Force
        
        Write-Host "Maven installed successfully!" -ForegroundColor Green
    }
    catch {
        Write-Host "Failed to download Maven: $_" -ForegroundColor Red
        Write-Host "Using fallback: attempting local Maven if available..." -ForegroundColor Yellow
    }
}

$Env:MAVEN_HOME = $MAVEN_HOME
$Env:PATH = "$MAVEN_HOME\bin;$Env:PATH"

# Check if Maven is available
if ((Test-Path $MAVEN_BIN) -or (Get-Command mvn -ErrorAction SilentlyContinue)) {
    Write-Host "Building backend..." -ForegroundColor Yellow
    Push-Location "$PSScriptRoot\backend"
    
    if (-not $SkipBuild) {
        & mvn clean package -DskipTests -q
        if ($LASTEXITCODE -ne 0) {
            Write-Host "Build failed!" -ForegroundColor Red
            Pop-Location
            exit 1
        }
    }
    
    if ($BuildOnly) {
        Write-Host "Build complete!" -ForegroundColor Green
        Pop-Location
        exit 0
    }
    
    Write-Host "Build complete! Starting backend..." -ForegroundColor Green
    Write-Host ""
    Write-Host "Backend running at: http://localhost:8080" -ForegroundColor Cyan
    Write-Host "API endpoints: http://localhost:8080/api/guevarra" -ForegroundColor Cyan
    Write-Host "Press Ctrl+C to stop" -ForegroundColor Yellow
    Write-Host ""
    
    & java -jar target/petstore-backend-0.0.1-SNAPSHOT.jar
    
    Pop-Location
}
else {
    Write-Host "Maven not found. Please install Maven or Docker to run the backend." -ForegroundColor Red
    exit 1
}
