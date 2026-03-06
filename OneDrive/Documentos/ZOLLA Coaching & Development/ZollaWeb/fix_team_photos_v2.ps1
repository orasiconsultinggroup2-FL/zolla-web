Add-Type -AssemblyName System.Drawing

function Crop-Image-Bottom($inPath, $outPath, $cropPercent) {
    if (!(Test-Path $inPath)) { return }
    $img = [System.Drawing.Image]::FromFile($inPath)
    $newH = [int]($img.Height * (1 - $cropPercent))
    $bmp = [System.Drawing.Bitmap]::new($img.Width, $newH)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $srcRect = [System.Drawing.Rectangle]::new(0, 0, $img.Width, $newH)
    $destRect = [System.Drawing.Rectangle]::new(0, 0, $img.Width, $newH)
    $g.DrawImage($img, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
    $g.Dispose()
    $bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
    $img.Dispose()
    Write-Host "Cropped $inPath -> $outPath"
}

# Image 2 has Luis, Andrea, Daniela with text at bottom.
# We need to split image 2 into 3 and crop the bottom for each.
$img2 = [System.Drawing.Image]::FromFile('c:\Users\FERNANDO\OneDrive\Documentos\ZOLLA Coaching & Development\ZollaWeb\public\images\equipo_temp\image2.png')
$w = [int]($img2.Width / 3)
$h = [int]($img2.Height * 0.72) # Most likely bottom 28% is text
$img2.Dispose()

function Crop-Third-Ready($index, $name) {
    global: $w, $h
    $full = [System.Drawing.Image]::FromFile('c:\Users\FERNANDO\OneDrive\Documentos\ZOLLA Coaching & Development\ZollaWeb\public\images\equipo_temp\image2.png')
    $bmp = [System.Drawing.Bitmap]::new($w, $h)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $srcRect = [System.Drawing.Rectangle]::new(($index * $w), 0, $w, $h)
    $destRect = [System.Drawing.Rectangle]::new(0, 0, $w, $h)
    $g.DrawImage($full, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
    $g.Dispose()
    $path = "c:\Users\FERNANDO\OneDrive\Documentos\ZOLLA Coaching & Development\ZollaWeb\public\images\equipo_v2\$name.png"
    $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
    $full.Dispose()
    Write-Host "Saved $path"
}

Crop-Third-Ready 0 'luis_ore'
Crop-Third-Ready 1 'andrea_pastor'
Crop-Third-Ready 2 'daniela_rios'

# Fernando's photo (image3) - The user said "as mine", but let's check if it has any text or if it needs uniform size.
# Actually, the user wants all photos to measure the same.
# I will make a uniform "working" version of all images.

# Juan's already updated with the new one.
