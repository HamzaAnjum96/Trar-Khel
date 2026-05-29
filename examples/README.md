# examples/

Committed reference output, generated from [`specs/examples/`](../specs/examples/) by
`npm run generate`. Each document type ships as **HTML + PDF + PNG** so you can see the
finished look without running the pipeline.

| Spec | HTML | PDF | PNG |
| --- | --- | --- | --- |
| `postal-notification.json` | [html](postal-notification.html) | [pdf](postal-notification.pdf) | [png](postal-notification.png) |
| `office-memo.json` | [html](office-memo.html) | [pdf](office-memo.pdf) | [png](office-memo.png) |
| `postcard.json` | [html](postcard.html) | [pdf](postcard.pdf) | [png](postcard.png) |

## Regenerate

```bash
npm run generate -- specs/examples/postal-notification.json examples/
npm run generate -- specs/examples/office-memo.json examples/
npm run generate -- specs/examples/postcard.json examples/
```

These three are also the worked references in [`docs/06-authoring-guide.md`](../docs/06-authoring-guide.md);
score them against [`docs/07-vision-critic-rubric.md`](../docs/07-vision-critic-rubric.md) to
calibrate your eye.
