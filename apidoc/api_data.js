define({ "api": [
  {
    "type": "delete",
    "url": "/weblink/:id",
    "title": "Delete an existing weblink",
    "version": "1.0.0",
    "group": "WEBLINKS",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "id",
            "description": "<p>Weblink identifier</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "filename": "app/app.js",
    "groupTitle": "WEBLINKS",
    "name": "DeleteWeblinkId"
  },
  {
    "type": "get",
    "url": "/com/",
    "title": "Displays in json all websites ending with 'com'",
    "version": "1.0.0",
    "group": "WEBLINKS",
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n[{\n  \"url\": \"http://bbc.com\",\n  \"rating\": 10,\n  \"id\": 2\n  },\n  {\n  \"url\": \"beeb.com\",\n  \"rating\": 5,\n  \"id\": 4\n  },\n  {\n  \"url\": \"testing2.com\",\n  \"rating\": 3,\n     \"id\": 11\n}]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "filename": "app/app.js",
    "groupTitle": "WEBLINKS",
    "name": "GetCom"
  },
  {
    "type": "get",
    "url": "/goodrating/",
    "title": "Displays in json all websites with rating above 8",
    "version": "1.0.0",
    "group": "WEBLINKS",
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n[{\n  \"id\": 2,\n  \"url\": \"http://www.bbc.com\",\n  \"rating\": 10\n},\n  {\n  \"id\": 10,\n  \"url\": \"testing.com\",\n  \"rating\": 10\n  }]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "filename": "app/app.js",
    "groupTitle": "WEBLINKS",
    "name": "GetGoodrating"
  },
  {
    "type": "get",
    "url": "/middle-rating/",
    "title": "Displays in json all websites with rating between 4 and 6 inclusive",
    "version": "1.0.0",
    "group": "WEBLINKS",
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n[{\n  \"id\": 1,\n  \"url\": \"http://www.bbc.co.uk\",\n  \"rating\": 6\n},\n  {\n  \"id\": 4,\n  \"url\": \"www.beeb.com\",\n  \"rating\": 5\n  }]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "filename": "app/app.js",
    "groupTitle": "WEBLINKS",
    "name": "GetMiddleRating"
  },
  {
    "type": "get",
    "url": "/weblink",
    "title": "Display all weblinks",
    "version": "1.0.0",
    "group": "WEBLINKS",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "id",
            "optional": false,
            "field": "id",
            "description": "<p>Weblink unique identifier</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "url",
            "description": "<p>Full web address including http</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "weblink",
            "description": "<p>Rating of the site between 1 and 10.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n[{\n  \"id\": 1,\n  \"url\": \"http://www.bbc.co.uk\",\n  \"rating\": 6\n},\n  {\n  \"id\": 2,\n  \"url\": \"http://www.microsoft.co.uk\",\n  \"rating\": 9\n  },\n {\n  \"id\": 3,\n  \"url\": \"http://www.youtube.com\",\n  \"rating\": 7\n}]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "filename": "app/app.js",
    "groupTitle": "WEBLINKS",
    "name": "GetWeblink"
  },
  {
    "type": "get",
    "url": "/weblink/:id",
    "title": "Read a specific weblink",
    "version": "1.0.0",
    "group": "WEBLINKS",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Weblinks unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "weblink.id",
            "description": "<p>Weblink id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "weblink.url",
            "description": "<p>Weblink url</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "weblink.rating",
            "description": "<p>Weblink rating</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n \"id\": 1,\n \"url\": \"http://www.bbc.co.uk\",\n \"rating\": 6\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/app.js",
    "groupTitle": "WEBLINKS",
    "name": "GetWeblinkId"
  },
  {
    "type": "post",
    "url": "/weblink/",
    "title": "Create a new weblink",
    "version": "1.0.0",
    "group": "WEBLINKS",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "url",
            "description": "<p>The URL of the site you want to add</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "rating",
            "description": "<p>The rating of the site between 1 and 10. 1 is poor. 10 is fantastic.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"url\": \"http://www.bbc.co.uk\",\n  \"rating\": 10\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "filename": "app/app.js",
    "groupTitle": "WEBLINKS",
    "name": "PostWeblink"
  },
  {
    "type": "put",
    "url": "/weblink/:id",
    "title": "Update an existing weblink",
    "version": "1.0.0",
    "group": "WEBLINKS",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "id",
            "description": "<p>Weblink identifier</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "url",
            "description": "<p>The updated URL</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "rating",
            "description": "<p>The rating of the site between 1 and 10. 1 is poor. 10 is fantastic.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"url\": \"http://www.bbc.co.uk\",\n  \"rating\": 10\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "filename": "app/app.js",
    "groupTitle": "WEBLINKS",
    "name": "PutWeblinkId"
  }
] });
