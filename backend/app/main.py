from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .auth import routes as auth_routes
from .posts import routes as post_routes
from .config import FRONTEND_URL


# Creating FASTAPI instance
app = FastAPI()


# Configuring CORS (cross origin resource sharing)

app.add_middleware(
    CORSMiddleware,
    allow_origins = [FRONTEND_URL],
    allow_credentials = True,
    allow_methods = ["*"],

    allow_headers = ["*"],

)


# Including the routers
app.include_router(auth_routes.router)
app.include_router(post_routes.router)