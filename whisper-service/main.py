from fastapi import FastAPI, UploadFile, Form
from transcriber import transcribe_audio

app = FastAPI(title="Whisper Local Service")

@app.get("/")
def root():
    return {"message": "Whisper service is running"}

@app.post("/whisper")
async def transcribe(file: UploadFile, translate: bool = Form(False)):
    content = await file.read()
    text = transcribe_audio(content, translate)
    return {"text": text}