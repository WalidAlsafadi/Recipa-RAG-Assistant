from fastapi.testclient import TestClient
from app.main import app


def test_import_main():
    assert app is not None


def test_health_endpoint():
    client = TestClient(app)
    res = client.get("/health")
    assert res.status_code == 200
    assert res.json().get("status") == "ok"
