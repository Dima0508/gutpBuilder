# Gulp Builder

Инструмент для разработки сайтов основанный на
[Gulp^3.9.1](https://www.npmjs.com/package/gulp/v/3.9.1),
[Bower^1.8.2](https://bower.io/).

Препроцессоры:

- PUG.
- SCSS.

Так же производится оптимизация ассетов при сборке картинки, js, css и тд.

Для запуска и сборки проекта нужен `node` версии `8.17.0`.

## Структура папок и файлов

```text
|-app/                      # исходники
|   |-blocks/
|   |   |-footer/
|   |   |   |-footer.js
|   |   |   |-footer.pug
|   |   |   |-footer.scss
|   |   |-head/
|   |   |   |-head.js
|   |   |   |-head.pug
|   |   |   |-head.scss
|   |   |-header/
|   |   |   |-header.js
|   |   |   |-header.pug
|   |   |   |-header.scss    
|   |-fonts
|   |   |-.gitkeep
|   |-img
|   |   |-.gitkeep
|   |-js
|   |   |-common.js
|   |-style
|   |   |-healper/
|   |   |   |-_mixins.scss
|   |   |   |-_normalizefix.scss
|   |   |   |-_vareable.scss
|   |   |-common.scss
|   |-index.pug
|-dist/                     # готовый проект(создается после запуска gulp) 
|   |-css
|   |   |-maps/
|   |   |   |-common.css.map    
|   |   |   |-vendor.min.css.map    
|   |   |-common.css    
|   |   |-vendor.min.css    
|   |-fonts
|   |-img
|   |-js
|   |   |-maps/
|   |   |   |-common.css.map    
|   |   |   |-vendor.min.css.map 
|   |   |-common.js    
|   |   |-vendor.min.js    
|   |-index.html
|-bower_components
|-node_modules
|-.gitignore
|-bower.json
|-gulpfile.js
|-pakage.json
|-pacage-lock.json
|-README.md
```

**.gitkeep** можно удалить. Это чтобы залить пустые папки на github

## Установка зависимостей

```sh
npm install
```

### Запустить проект на локальном сервере для разработки

```sh
npm run dev
```

### Окончательная сборка проекта с минификацией файлов

```sh
npm run build
```

### Установка зависимостей через Bower

```sh
node_modules/bower/bin/bower install <package-name> 
```

Подключаются в `gulpfile.js`

```js
vendor:{
    css: [
        'bower_components/reset.scss/reset.css',
        'bower_components/normalize-css/normalize.css'
    ],
    js: [
        'bower_components/jquery/dist/jquery.min.js',
        'bower_components/jquery-migrate/jquery-migrate.js'
    ]
},
```
