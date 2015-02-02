#!/bin/bash

curl -sS -o snowfall.png http://www.erh.noaa.gov/hydromet/eventdata/stormTotalv3_48/stormTotalv3_48.snowimage.png

convert snowfall.png -fill '#bfd3e6' -opaque '#a59fff' snowfall.png
convert snowfall.png -fill '#bacce3' -opaque '#7870ff' snowfall.png
convert snowfall.png -fill '#b5c6df' -opaque '#5b51ff' snowfall.png
convert snowfall.png -fill '#adb7d8' -opaque '#0e00ff' snowfall.png
convert snowfall.png -fill '#a5aad0' -opaque '#850cff' snowfall.png
convert snowfall.png -fill '#9f9cc8' -opaque '#cf03ff' snowfall.png
convert snowfall.png -fill '#998cbf' -opaque '#ff01f9' snowfall.png
convert snowfall.png -fill '#8a69a8' -opaque '#ff0eb7' snowfall.png
convert snowfall.png -fill '#7a468c' -opaque '#ffaaef' snowfall.png
convert snowfall.png -fill '#65246d' -opaque '#e5e5e5' snowfall.png
convert snowfall.png -fill '#4d004b' -opaque '#334c59' snowfall.png