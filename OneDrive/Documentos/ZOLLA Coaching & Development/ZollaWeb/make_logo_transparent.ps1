Add-Type -AssemblyName System.Drawing

$inputPath = "c:\Users\FERNANDO\OneDrive\Documentos\ZOLLA Coaching & Development\LOGO\LOGO.jpg"
$outputPath = "c:\Users\FERNANDO\OneDrive\Documentos\ZOLLA Coaching & Development\ZollaWeb\public\images\logo.png"

$img = [System.Drawing.Image]::FromFile($inputPath)
$bmp = [System.Drawing.Bitmap]::new($img.Width, $img.Height)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.DrawImage($img, 0, 0, $img.Width, $img.Height)
$g.Dispose()

# Make white (and near white) transparent
$bmp.MakeTransparent([System.Drawing.Color]::White)

# Also handle slight variations of white
for ($y = 0; $y -lt $bmp.Height; $y++) {
    for ($x = 0; $x -lt $bmp.Width; $x++) {
        $color = $bmp.GetPixel($x, $y)
        if ($color.R -gt 245 -and $color.G -gt 245 -and $color.B -gt 245) {
            $bmp.SetPixel($x, $y, [System.Drawing.Color]::Transparent)
        }
    }
}

$bmp.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()
$img.Dispose()
Write-Host "Logo saved to $outputPath with transparency."
