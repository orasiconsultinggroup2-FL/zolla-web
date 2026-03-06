Add-Type -AssemblyName System.Drawing
$images = Get-ChildItem "public\images\equipo_v2\*.png"
foreach ($f in $images) {
    $img = [System.Drawing.Image]::FromFile($f.FullName)
    Write-Host "$($f.Name): $($img.Width) x $($img.Height)"
    $img.Dispose()
}
