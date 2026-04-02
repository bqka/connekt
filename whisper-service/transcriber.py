import tempfile
from model_loader import WhisperModel

def transcribe_audio(file_bytes: bytes, translate: bool = False):
    with tempfile.NamedTemporaryFile(delete=False, suffix=".wav") as tmp:
        tmp.write(file_bytes)
        tmp.flush()

        model = WhisperModel.get_instance("small")
        task = "translate" if translate else "transcribe"
        print(f"Processing task={task}")

        result = model.transcribe(tmp.name, task=task)
        return result["text"]
