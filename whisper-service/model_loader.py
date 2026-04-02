import whisper

class WhisperModel:
    _instance = None

    @staticmethod
    def get_instance(model_size: str = "base"):
        if WhisperModel._instance is None:
            print(f"Loading Whisper model: {model_size}")
            WhisperModel._instance = whisper.load_model(model_size)
        return WhisperModel._instance