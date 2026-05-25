from fastapi import FastAPI


def test_app_import_and_title():
    import main

    assert hasattr(main, "app"), "main.py should expose `app`"
    app = main.app
    assert isinstance(app, FastAPI)
    assert getattr(app, "title", None) == "EliteSignal AI Backend"
