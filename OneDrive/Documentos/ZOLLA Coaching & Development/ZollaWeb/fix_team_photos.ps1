Add-Type -AssemblyName System.Drawing

function Crop-Image($path, $outPath, $cropW, $cropH) {
    $img = [System.Drawing.Image]::FromFile($path)
    $bmp = [System.Drawing.Bitmap]::new($cropW, $cropH)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $srcRect = [System.Drawing.Rectangle]::new(0, 0, $cropW, $cropH)
    $destRect = [System.Drawing.Rectangle]::new(0, 0, $cropW, $cropH)
    $g.DrawImage($img, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
    $g.Dispose()
    $bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
    $img.Dispose()
}

# Image 1 (Juan)
# Let's guess crop to remove bottom text. I'll take top 75%
$img1 = [System.Drawing.Image]::FromFile('c:\Users\FERNANDO\OneDrive\Documentos\ZOLLA Coaching & Development\ZollaWeb\public\images\equipo_temp\image1.png')
$w1 = $img1.Width
$h1 = [int]($img1.Height * 0.72)
$img1.Dispose()
Crop-Image 'c:\Users\FERNANDO\OneDrive\Documentos\ZOLLA Coaching & Development\ZollaWeb\public\images\equipo_temp\image1.png' 'c:\Users\FERNANDO\OneDrive\Documentos\ZOLLA Coaching & Development\ZollaWeb\public\images\equipo_v2\juan_zolla.png' $w1 $h1

# Image 2 (Luis, Andrea, Daniela)
$img2 = [System.Drawing.Image]::FromFile('c:\Users\FERNANDO\OneDrive\Documentos\ZOLLA Coaching & Development\ZollaWeb\public\images\equipo_temp\image2.png')
$totalW = $img2.Width
$totalH = $img2.Height
$thirdW = [int]($totalW / 3)
$portraitH = [int]($totalH * 0.7) # Crop bottom text
$img2.Dispose()

function Crop-Third($index, $name) {
    global: $thirdW, $portraitH
    $fullImg = [System.Drawing.Image]::FromFile('c:\Users\FERNANDO\OneDrive\Documentos\ZOLLA Coaching & Development\ZollaWeb\public\images\equipo_temp\image2.png')
    $bmp = [System.Drawing.Bitmap]::new($thirdW, $portraitH)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $srcRect = [System.Drawing.Rectangle]::new(($index * $thirdW), 0, $thirdW, $portraitH)
    $destRect = [System.Drawing.Rectangle]::new(0, 0, $thirdW, $portraitH)
    $g.DrawImage($fullImg, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
    $g.Dispose()
    $bmp.Save("c:\Users\FERNANDO\OneDrive\Documentos\ZOLLA Coaching & Development\ZollaWeb\public\images\equipo_v2\$name.png", [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
    $fullImg.Dispose()
}

Crop-Third 0 'luis_ore'
Crop-Third 1 'andrea_pastor'
Crop-Third 2 'daniela_rios'

Write-Host "Done cropping team photos."
