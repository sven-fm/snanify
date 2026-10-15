#!/usr/bin/env bash
# Cuts the 9:16 ad from an iPhone screen recording of a sitting.
#   ads/src/cut-video.sh <recording> <lang en|hi> <market diaspora|india> <hook> <reading> <breath> <sankalp> [patra.png]
# The four times are in-points in seconds into the recording: a moment for the
# hook, the reading, the breath and the held sankalp. The recording plays
# inside a phone outline under the caption, cut clean of the status bar and
# Safari's toolbar; then the Patra in the same phone; then the end card.
# Screen geometry (868 x 1330 at 106, 590) is shared with card.html.
set -euo pipefail
IN=$1 LANG_=$2 MARKET=$3 T1=$4 T2=$5 T3=$6 T4=$7 PATRA_IMG=${8:-ads/out/patra-916-$2.png}
OUT=ads/out
SEG=2.8 PATRA=3.4 END=2.6
SW=868 SHT=1330 SX=106 SY=590

# The app without the phone's chrome: on a 1206 x 2622 recording the status
# bar ends near 200 and Safari's toolbar starts near 2287.
W=$(ffprobe -v error -select_streams v:0 -show_entries stream=width -of csv=p=0 "$IN")
H=$(ffprobe -v error -select_streams v:0 -show_entries stream=height -of csv=p=0 "$IN")
TOP=$(( H * 200 / 2622 )) KEEP=$(( H * 2087 / 2622 ))
V="crop=${W}:${KEEP}:0:${TOP},scale=${SW}:-2,crop=${SW}:${SHT}:0:0,setsar=1,fps=30,format=yuv420p"

MAIN=$(echo "4*$SEG + $PATRA" | bc)
TOTAL=$(echo "$MAIN + $END" | bc)
c() { echo "$1*$SEG" | bc; }

ffmpeg -loglevel error -y \
  -ss "$T1" -t $SEG -i "$IN" -ss "$T2" -t $SEG -i "$IN" -ss "$T3" -t $SEG -i "$IN" -ss "$T4" -t $SEG -i "$IN" \
  -loop 1 -t $PATRA -i "$PATRA_IMG" \
  -loop 1 -t $END -i "$OUT/end-$LANG_-$MARKET.png" \
  -i "$OUT/frame-$LANG_-1.png" -i "$OUT/frame-$LANG_-2.png" -i "$OUT/frame-$LANG_-3.png" -i "$OUT/frame-$LANG_-4.png" -i "$OUT/frame-$LANG_-5.png" \
  -f lavfi -t "$MAIN" -i "color=c=0xf2ead9:s=1080x1920:r=30" \
  -f lavfi -t "$TOTAL" -i anullsrc=r=48000:cl=stereo \
  -filter_complex "
    [0:v]$V[a];[1:v]$V[b];[2:v]$V[c];[3:v]$V[d];
    [4:v]scale=${SW}:-2,crop=${SW}:${SHT}:0:0,zoompan=z='1+0.0008*on':x='iw/2-(iw/zoom/2)':y='0':d=1:s=${SW}x${SHT}:fps=30,setsar=1,format=yuv420p[e];
    [a][b][c][d][e]concat=n=5:v=1:a=0[screen];
    [11:v][screen]overlay=${SX}:${SY}[s0];
    [s0][6:v]overlay=enable='between(t,0,$(c 1))'[o1];
    [o1][7:v]overlay=enable='between(t,$(c 1),$(c 2))'[o2];
    [o2][8:v]overlay=enable='between(t,$(c 2),$(c 3))'[o3];
    [o3][9:v]overlay=enable='between(t,$(c 3),$(c 4))'[o4];
    [o4][10:v]overlay=enable='between(t,$(c 4),$MAIN)',format=yuv420p[main];
    [5:v]scale=1080:1920,fps=30,setsar=1,format=yuv420p[f];
    [main][f]concat=n=2:v=1:a=0[v]" \
  -map "[v]" -map 12:a -c:v libx264 -profile:v high -crf 18 -preset slow -pix_fmt yuv420p \
  -c:a aac -b:a 128k -shortest -movflags +faststart "$OUT/video-kartik-$LANG_-$MARKET.mp4"
echo "$OUT/video-kartik-$LANG_-$MARKET.mp4"
