# Annotations

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 22.1.3.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Заметки по реализации

### Архитектура

- Данные документа загружаются через **route resolver** (`documentResolver`), который делает HTTP-запрос за JSON. При ошибке (404/битый JSON) — редирект на `/not-found`.
- Аннотации хранятся в **`AnnotationService`** (`providedIn: 'root'`) в `annotations`.
- Координаты аннотаций хранятся как **доли `0–1`** (`x`, `y`), а не в пикселях. Благодаря этому позиция не зависит от текущего масштаба (zoom) и размера страницы.
- Перетаскивание реализовано на **RxJS**: `mousedown → switchMap(mousemove until mouseup)`, что даёт декларативный поток без ручного управления. Очистка — через `takeUntilDestroyed`.

### Плюсы

- **Масштабонезависимые аннотации** — при любом zoom координаты остаются корректными.
- **Учет границ страницы для аннотации** — при перетаскивании аннотации ограничены размерами страницы.
- **OnPush + сигналы** — минимальное число перерисовок.
- **Расширяемая модель** — `Annotation` описан как discriminated union (`type: 'text'`), легко добавить новые типы (стрелки, прямоугольники, картинки).
- **Единый источник правды** — весь стейт аннотаций в одном сервисе, компоненты только отображают и эмитят события.
- **Устойчивость к ошибкам загрузки** — resolver и `onImageError` корректно обрабатывают отсутствующий документ и отсутствующие страницы.
- **Переиспользуемые примитивы** — `IconButton`, общие Tailwind-классы через константу `boxClass`.

### Минусы и ограничения

- **Нет персистентности** — `Save` только выводит JSON в консоль; данные не сохраняются на бэкенд или в локал сторадж и теряются при перезагрузке.
- **Доступность (a11y)** — перетаскивание только мышью, нет управления с клавиатуры и ARIA-атрибутов.
- **Zoom + drag рассинхрон** — при перетаскивание и zoom может возникнуть проблема.

### Известные проблемы и способы решения

| Проблема | Причина | Решение |
|---|---|---|
| Аннотации не сохраняются | `save()` пишет в `console.log` | Добавить HTTP `POST`/`PUT` в `AnnotationService` и слой персистентности |
| Ограниченная a11y | Взаимодействие завязано на мышь | Добавить клавиатурное перемещение (стрелки), `role`/`aria-*`, фокус-стили |
| Возможна рассинхронизация при drag во время zoom | `rect` фиксируется на старте drag | Пересчитывать `rect` внутри потока или пересчитывать позицию от актуального контейнера |
