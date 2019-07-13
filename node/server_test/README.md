# Cкрипт request для тестирования веб сервера
#### Задача
1. Создать локальный веб сервер `server`, отвечающий на запросы каждые 100ms
2. Создать скрипт `request`, принимающий на вход
  - количество запросов `N`
  - тип запросов - параллельный или последовательный

Скрипт `request` должен отправлять `N` последовательных или параллельных `HTTP` запросов к локальному серверу `server`

#### Структура
* server.js – реализация веб сервера `server`
* request.js – реализация скрипта `request`

### How To
#### Установка
```
cd path/to/server_test
npm install
```
#### Скрипт server.js
```
>>> node server.js --help
Usage: server [options]

package for simple server testing

Options:
  -v, --version    output the version number
  -p, --port <n>   An integer argument (default: 3000)
  -d, --delay <n>  Response delay time, ms (default: 100)
  -h, --help       output usage information
```
Пример:
```
>>> node server.js -p 8000 -d 500
Server running at http://127.0.0.1:8000/
Used response delay 500 ms
New connection [from: 127.0.0.1]: Sat Jul 13 2019 12:40:09 GMT+0300 (Москва, стандартное время)
...
```
#### Скрипт request.js
```
>>> node request.js --help
Usage: request [options]

Script to send requests to the test server

Options:
  -v, --version        output the version number
  -a, --address <url>  Address of test server with protocol (http or https) (default: "http://localhost:3000")
  -n, --number <n>     Number of requests to server (default: 5)
  --async              Do requests in parallel mode
  -h, --help           output usage information
```
Пример:
```
>>> node request.js -a http://127.0.0.1:8000/ -n 3 --async
Run 3 requests to http://127.0.0.1:8000/ (async)
Request 0: Status code 200 (518 ms)
Request 1: Status code 200 (517 ms)
Request 2: Status code 200 (518 ms)
Total resuests: 3 (success: 3, errors: 0)
Total time: 522 ms
```
#### Тесты
Для запуска тестов используйте команду `npm test`
