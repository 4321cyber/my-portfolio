$filePath = "C:\Users\user\OneDrive\Desktop\my works\httt\style.css"
$content = Get-Content -LiteralPath $filePath -Raw

# Find all @media blocks using brace counting
$mediaBlocks = @()
$currentBlock = ""
$braceDepth = 0
$inMedia = $false
$lines = $content -split "`n"

for ($i = 0; $i -lt $lines.Count; $i++) {
    $line = $lines[$i]
    
    if (-not $inMedia) {
        if ($line -match '^\s*@media\s*\(') {
            $inMedia = $true
            $currentBlock = $line
            $braceDepth = ($line.ToCharArray() | Where-Object { $_ -eq '{' }).Count
            $braceDepth -= ($line.ToCharArray() | Where-Object { $_ -eq '}' }).Count
        }
    } else {
        if ($currentBlock.Length -gt 0) {
            $currentBlock += "`n" + $line
        } else {
            $currentBlock = $line
        }
        $braceDepth += ($line.ToCharArray() | Where-Object { $_ -eq '{' }).Count
        $braceDepth -= ($line.ToCharArray() | Where-Object { $_ -eq '}' }).Count
        
        if ($braceDepth -le 0) {
            $mediaBlocks += $currentBlock
            $inMedia = $false
            $currentBlock = ""
        }
    }
}

Write-Host "Found $($mediaBlocks.Count) media query blocks"

# Remove media blocks from content (remove all occurrences)
foreach ($block in $mediaBlocks) {
    $content = $content.Replace($block, '')
}

# Remove old RESPONSIVE DESIGN section header if present
$content = $content -replace '/\*\s*=+\s*\n\s*RESPONSIVE DESIGN.*?\*/', ''

# Build consolidated section
$consolidated = "`n/* ==========================================`n   RESPONSIVE DESIGN (MEDIA QUERIES)`n   ========================================== */`n`n"
foreach ($block in $mediaBlocks) {
    $consolidated += $block.Trim() + "`n`n"
}

# Remove trailing whitespace from content
$content = $content.TrimEnd()

# Append consolidated section
$content += $consolidated

# Write back
Set-Content -LiteralPath $filePath -Value $content
Write-Host "Media queries consolidated at the bottom of $filePath"
