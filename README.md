# Gulp Builder
## Gulp Сборщик

## Структура папок и файлов
```
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


