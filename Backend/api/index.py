from main import app


def handler(request):
    with app.test_request_context(
        path=request.path,
        base_url=request.base_url,
        query_string=request.query_string,
        method=request.method,
        headers=request.headers,
        data=request.get_data()
    ):
        return app.full_dispatch_request()
