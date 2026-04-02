from pydantic_settings import BaseSettings
from typing import List
import os

class Settings(BaseSettings):
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    FRONTEND_ORIGINS: str = "http://localhost:3000"

    @property
    def origins_list(self) -> List[str]:
        return [origin.strip() for origin in self.FRONTEND_ORIGINS.split(",")]

settings = Settings(_env_file=".env")