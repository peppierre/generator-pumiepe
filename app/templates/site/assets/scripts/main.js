PUMIEPE.route(
    "/",
    "index.hbs",
    {
        onModel: function (params) {
            return {
                "greeting": "Bark! Bark!",
                "items": [
                    {"title": "PUMIEPE framework installed", "href": "/pumiepe"},
                    {"title": "some cute routes", "href": "/routes"},
                    {"title": "...and sample models", "href": "/models"}
                ]
            };
        }
    }
);
PUMIEPE.route(
    "/pumiepe",
    "pumiepe.hbs"
);
PUMIEPE.route(
    "/routes",
    "routes.hbs",
    {
        onModel: function (params) {
            return Promise.resolve(
                $.ajax("/models/routes.json")
            )
        }
    }
);
PUMIEPE.route(
    "/models",
    "models.hbs",
    {
        onModel: function (params) {
            return Promise.resolve(
                $.ajax("/models/models.json")
            )
        }
    }
);
