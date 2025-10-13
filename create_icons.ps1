# Create new icons from cn-icon.svg
Write-Host "Creating new icons from cn-icon.svg..."

# Copy cn-icon.svg as the new icon.svg
Copy-Item "assets\images\cn-icon.svg" "assets\images\icon.svg" -Force
Write-Host "✅ Created icon.svg"

# Copy cn-icon.svg as the new splash-icon.svg  
Copy-Item "assets\images\cn-icon.svg" "assets\images\splash-icon.svg" -Force
Write-Host "✅ Created splash-icon.svg"

Write-Host "✅ New icon files created!"
Write-Host "Now you need to convert SVG to PNG manually or use an online converter."
Write-Host "The SVG files are ready in assets/images/"
