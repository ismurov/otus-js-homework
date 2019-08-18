# Работа с потоками в NodeJS
#### Задача
Необходимо отсортировать большой файл со случайными целыми числами, размером 100 МБ, в условиях ограниченной оперативной памяти - 50 МБ. Решение должно быть построено с использованием потоков.

Для решения задачи можно использовать алгоритм “Сортировка слиянием”.
Процесс можно разделить на 3 этапа.

Этап 0
Любым удобным вам способом создаем исходный файл с числами размером 100 МБ.

Этап 1
Исходный файл с числами необходимо разбить на несколько файлов поменьше, предварительно отсортировав их независимо друг от друга.

Этап 2
Необходимо создать механизм чтения чисел сразу из нескольких файлов (потоков).
Читать данные из потоков следует по принципу pause/resume.

Этап 3
Необходимо создать цикл, который будет работать с данными сразу из всех потоков.
Такой цикл будет прерван только тогда, когда будут полностью прочитаны все файлы.
В цикле следует искать наименьшее значение и записывать его в итоговый файл.
1 итерация = 1 число

Для проверки решения, скрипт необходимо запустить командой
$ node --max-old-space-size=50 script.js

### Реализация
#### Установка
```
cd path/to/tree
npm install
```
#### Скрипт generator.js
Скрипт для генерации файла со случайными числами.
```
>>> node generator.js -h
Usage: generator [options]

Script to generate a file of a given size with random numbers separated by a new line.

Options:
  -v, --version      output the version number
  -f, --file <path>  path and name for the generated file (default: "./bigfile.txt")
  -s, --size <n>     size of output file in megabytes (default: 100)
  --min <n>          minimum generated number (default: 0)
  --max <n>          maximum generated number (default: 999999)
  -h, --help         output usage information
```

Пример использования:
```
>>> node generator.js -f filename.txt -s 100 --min -20 --max 20
104857602 bytes was written.
Saved in filename.txt
```

#### Скрипт sorter.js
Скрипт для сортировки больших файлов с числами
```
>>> node sorter.js -h
Usage: sorter [options]

Script to sort a file with numbers separated by a new line.

Options:
  -v, --version      output the version number
  -f, --file <path>  path and name for the generated file (default: "bigfile.txt")
  -h, --help         output usage information
```
Пример использования:
```
node sorter.js -f filename.txt
Preprocessing file...
Read lines: 34811811, with errors: 0, create temptory files: 107
Sorting...
Sorting complete!
```
#### Тесты
Для запуска тестов используйте команду `npm test`
Для измерения временных показателей `npm run timeit`

