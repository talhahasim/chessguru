"""
Kokoro TTS worker (free, local, Apache-2.0 model).

Reads one JSON job per line on stdin: {"text": "...", "voice": "af_heart", "speed": 1.0, "out": "path.wav"}
Writes the WAV and prints one JSON line per job: {"out": "...", "seconds": 1.23}

Used by scripts/voice.ts – you normally don't call this directly.
"""
import json
import os
import sys

import numpy as np
import soundfile as sf
from kokoro_onnx import Kokoro

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL = os.environ.get("KOKORO_MODEL", os.path.join(ROOT, "models", "kokoro-v1.0.onnx"))
VOICES = os.environ.get("KOKORO_VOICES", os.path.join(ROOT, "models", "voices-v1.0.bin"))

kokoro = Kokoro(MODEL, VOICES)

for line in sys.stdin:
    line = line.strip()
    if not line:
        continue
    job = json.loads(line)
    samples, sr = kokoro.create(job["text"], voice=job.get("voice", "af_heart"), speed=job.get("speed", 1.0), lang="en-us")
    # Trim silence at both ends (keep 40 ms) so the timeline can be tight.
    loud = np.where(np.abs(samples) > 0.01)[0]
    if len(loud):
        pad = int(0.04 * sr)
        samples = samples[max(0, loud[0] - pad) : min(len(samples), loud[-1] + pad)]
    os.makedirs(os.path.dirname(job["out"]), exist_ok=True)
    sf.write(job["out"], samples, sr, format="MP3" if job["out"].endswith(".mp3") else "WAV")
    print(json.dumps({"out": job["out"], "seconds": round(len(samples) / sr, 3)}), flush=True)
