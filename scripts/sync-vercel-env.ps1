# Sync required production env vars from local .env to Vercel.
# Usage:
#   npx vercel login
#   npx vercel link
#   powershell -ExecutionPolicy Bypass -File .\scripts\sync-vercel-env.ps1

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

if (-not (Test-Path ".env")) {
  throw ".env not found. Run neon deploy / neon env pull first."
}

$required = @(
  "DATABASE_URL",
  "DATABASE_URL_UNPOOLED",
  "AUTH_SECRET",
  "NEXTAUTH_SECRET",
  "NEXTAUTH_URL",
  "AUTH_URL"
)

$map = @{}
Get-Content ".env" | ForEach-Object {
  if ($_ -match "^\s*#" -or $_ -match "^\s*$") { return }
  $parts = $_ -split "=", 2
  if ($parts.Count -eq 2) {
    $map[$parts[0].Trim()] = $parts[1].Trim().Trim('"').Trim("'")
  }
}

if (-not $map.ContainsKey("AUTH_URL") -and $map.ContainsKey("NEXTAUTH_URL")) {
  $map["AUTH_URL"] = $map["NEXTAUTH_URL"]
}

foreach ($key in $required) {
  if (-not $map.ContainsKey($key) -or [string]::IsNullOrWhiteSpace($map[$key])) {
    Write-Warning "Skipping missing key: $key"
    continue
  }
  Write-Host "Setting $key for production/preview/development..."
  foreach ($envName in @("production", "preview", "development")) {
    $map[$key] | npx vercel env add $key $envName --force 2>$null
    if ($LASTEXITCODE -ne 0) {
      # Older CLI variants may not support --force; try remove + add
      npx vercel env rm $key $envName -y 2>$null | Out-Null
      $map[$key] | npx vercel env add $key $envName
    }
  }
}

Write-Host ""
Write-Host "Done. Redeploy with: npx vercel --prod"
Write-Host "Or push a commit / Redeploy from the Vercel dashboard."
