# Cкрипт tree для вывода списка файлов и папок файловой системы
#### Задача
Напишите `NodeJS` скрипт `tree` для вывода списка файлов и папок файловой системы.
Результатом работы должен быть объект с массивами `{ files, folders }`.
Вызовы файловой системы должны быть асинхронными.
Скрипт принимает входной параметр - путь до папки.
Добавить возможность выполнять этот скрипт через команду `npm run tree -- -p path`

Пример

```
foo/
├── bar/
│├── bar1.txt
│├── bar2.txt
│└── baz/
├── f1.txt
└── f2.txt
```

При вызове с путем `foo/` скрипт должен вернуть структуру:

```json
{
  "files": [
    "foo/f1.txt",
    "foo/f2.txt",
    "foo/bar/bar1.txt",
    "foo/bar/bar2.txt"
  ],
  "dirs": [
    "foo",
    "foo/bar",
    "foo/bar/baz"
  ]
}
```

### How To
#### Установка
```
cd path/to/tree
npm install
```

#### Скрипт tree.js
```
>>> node tree.js -h
Usage: tree [options]

Script to search for files and folders in the selected system path

Options:
  -v, --version      output the version number
  -p, --path <path>  search path (default: ".")
  -h, --help         output usage information
```

Пример:
```
>>> node tree.js -p foo
Search in 'foo' path...
Results:
{
  files: [
    'foo/f1.txt',
    'foo/f2.txt',
    'foo/bar/bar1.txt',
    'foo/bar/bar2.txt'
  ],
  dirs: [
    'foo',
    'foo/bar',
    'foo/bar/baz'
  ]
}
```
#### Тесты
Для запуска тестов используйте команду `npm test`
