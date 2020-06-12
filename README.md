# universal-demo-nineteen-ts

* ----------------------------------------
* ----------------------------------------

Local Storage:

KEY:
	localforage/persist:root
VALUE:
	"{\"device\":\"{\\\"userAgent\\\":\\\"desktop\\\",\\\"isBot\\\":false}\",\"info\":\"{\\\"loaded\\\":true,\\\"data\\\":{\\\"time\\\":1587752834668,\\\"delay\\\":6600,\\\"message\\\":\\\"RESOLVED! 200 - Data Found. P1 Good Result!\\\",\\\"status\\\":200},\\\"loading\\\":false}\",\"infoAlert\":\"{\\\"loaded\\\":true,\\\"data\\\":{\\\"time\\\":1587752836274,\\\"delay\\\":1600,\\\"message\\\":\\\"RESOLVED! 200 - Data Found. P1 Good Result!\\\",\\\"status\\\":200},\\\"loading\\\":false}\",\"infoAlertThree\":\"{\\\"loaded\\\":false,\\\"data\\\":null}\",\"infoAlertFour\":\"{\\\"loaded\\\":false,\\\"data\\\":null}\"}"


window.__PRELOADED__=true; window.REDUX_DATA={"online":true,"counterCollection":{"AboutOneMultireducer1":{"countMultireducer":0},"AboutTwoMultireducer1":{"countMultireducer":0},"AboutTwoMultireducer2":{"countMultireducer":0},"AboutTwoMultireducer3":{"countMultireducer":0}},"counterPreloaded":{"counterPreloadedState":56},"device":{"userAgent":"desktop","isBot":false},"filterableTableCollection":{"AboutOneMultireducerFilterableTable1":{"loaded":false,"data":null},"AboutOneMultireducerFilterableTable2":{"loaded":false,"data":null}},"info":{"loaded":true,"data":{"time":1587752834668,"delay":6600,"message":"RESOLVED! 200 - Data Found. P1 Good Result!","status":200},"loading":false},"infoAlert":{"loaded":true,"data":{"time":1587752836274,"delay":1600,"message":"RESOLVED! 200 - Data Found. P1 Good Result!","status":200},"loading":false},"infoAlertOne":{"loaded":false,"data":null},"infoAlertTwo":{"loaded":false,"data":null},"infoAlertThree":{"loaded":false,"data":null},"infoAlertFour":{"loaded":false,"data":null},"lineChartCollection":{"AboutTwoMultireducerLineChart1":{"loaded":false,"data":null},"AboutTwoMultireducerLineChart2":{"loaded":false,"data":null}},"temperatureCalculatorCollection":{"AboutOne1":{"temperature":"","scale":"c"},"AboutOne2":{"temperature":"","scale":"c"},"AboutTwo1":{"temperature":"","scale":"c"},"AboutTwo2":{"temperature":"","scale":"c"}}};

window.__APOLLO_STATE__ = {
    "Post:1": {
        "id": 1,
        "__typename": "Post",
        "name": "Rick Sanchez",
        "status": "Alive",
        "species": "Human",
        "type": "",
        "gender": "Male",
        "origin": {
            "name": "Earth (C-137)",
            "type": null,
            "dimension": null
        },
        "location": {
            "name": "Earth (Replacement Dimension)",
            "type": null,
            "dimension": null
        },
        "image": "https:\u002F\u002Frickandmortyapi.com\u002Fapi\u002Fcharacter\u002Favatar\u002F1.jpeg",
        "episode": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
    },
    "ROOT_QUERY": {
        "__typename": "Query",
        "character({\"id\":\"1\"})": {
            "__ref": "Post:1"
        },
        "reviews({\"episode\":\"EMPIRE\"})": [{
            "__typename": "Review",
            "episode": "EMPIRE",
            "stars": 4,
            "commentary": "This IS a great movie?"
        }, {
            "__typename": "Review",
            "episode": "EMPIRE",
            "stars": 1,
            "commentary": "This is NOT a great movie!"
        }]
    }
};


{"id":1,"name":"Rick Sanchez","status":"Alive","species":"Human","type":"","gender":"Male","origin":{"name":"Earth (C-137)","url":"https://rickandmortyapi.com/api/location/1"},"location":{"name":"Earth (Replacement Dimension)","url":"https://rickandmortyapi.com/api/location/20"},"image":"https://rickandmortyapi.com/api/character/avatar/1.jpeg","episode":["https://rickandmortyapi.com/api/episode/1","https://rickandmortyapi.com/api/episode/2","https://rickandmortyapi.com/api/episode/3","https://rickandmortyapi.com/api/episode/4","https://rickandmortyapi.com/api/episode/5","https://rickandmortyapi.com/api/episode/6","https://rickandmortyapi.com/api/episode/7","https://rickandmortyapi.com/api/episode/8","https://rickandmortyapi.com/api/episode/9","https://rickandmortyapi.com/api/episode/10","https://rickandmortyapi.com/api/episode/11","https://rickandmortyapi.com/api/episode/12","https://rickandmortyapi.com/api/episode/13","https://rickandmortyapi.com/api/episode/14","https://rickandmortyapi.com/api/episode/15","https://rickandmortyapi.com/api/episode/16","https://rickandmortyapi.com/api/episode/17","https://rickandmortyapi.com/api/episode/18","https://rickandmortyapi.com/api/episode/19","https://rickandmortyapi.com/api/episode/20","https://rickandmortyapi.com/api/episode/21","https://rickandmortyapi.com/api/episode/22","https://rickandmortyapi.com/api/episode/23","https://rickandmortyapi.com/api/episode/24","https://rickandmortyapi.com/api/episode/25","https://rickandmortyapi.com/api/episode/26","https://rickandmortyapi.com/api/episode/27","https://rickandmortyapi.com/api/episode/28","https://rickandmortyapi.com/api/episode/29","https://rickandmortyapi.com/api/episode/30","https://rickandmortyapi.com/api/episode/31","https://rickandmortyapi.com/api/episode/32","https://rickandmortyapi.com/api/episode/33","https://rickandmortyapi.com/api/episode/34","https://rickandmortyapi.com/api/episode/35","https://rickandmortyapi.com/api/episode/36"],"url":"https://rickandmortyapi.com/api/character/1","created":"2017-11-04T18:48:46.250Z"}




* ----------------------------------------
* ----------------------------------------

GraphiQLExample > DuplicatesPlugin > `import 'graphiql/graphiql.css';`

`WARNING in ℹ ｢wdm｣: Compiled with warnings.
[1mMissing sources: Expected 2, found 0.
		Found map: {}
		Duplicate Sources / Packages - Duplicates found! ⚠️
		* Duplicates: Found 2 similar files across 2 code sources (both identical + similar)
			accounting for 44449 bundled bytes.
		* Packages: Found 0 packages with 0 resolved, 0 installed, and 0 depended versions.`

https://github.com/FormidableLabs/inspectpack/#diagnosing-duplicates
https://github.com/FormidableLabs/inspectpack/issues/125
https://github.com/FormidableLabs/inspectpack/issues/132
