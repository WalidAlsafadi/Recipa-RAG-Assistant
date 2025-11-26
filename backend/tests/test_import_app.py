def test_can_import_app():
    """
    Basic sanity test:
    نتأكد إنه نقدر نعمل import لـ app.main بدون ما يطلع Error.
    """
    from app.main import app

    # نتأكد إنه فيه object اسمه app
    assert app is not None
