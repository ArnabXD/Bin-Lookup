# BIN-LOOKUP

> Search bin details from various bin database

### Available Sources

- [bins.ws](http://bins.ws)
- [bins.su](http://bins.su)

### Installation

```bash
npm i @arnabxd/bin-lookup
```

or

```bash
yarn add @arnabxd/bin-lookup
```

### Example

```ts
import { binLookup } from '@arnabxd/bin-lookup';
// or
const { binLookup } = require('@arnabxd/bin-lookup');
```

```ts
// using async await
let bindata = await binLookup(439129, 'bins.su');
console.log(bindata);

// or using callbacks
binLookup(439129).then((data) => console.log(data));
```

### API

- #### binLookup
  - `bin` : `number`
  - `site` : `string` - [Supported Websites](#available-sources). Default `bins.ws`)