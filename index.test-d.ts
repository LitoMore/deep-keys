import {expectType} from 'tsd';
import deepKeys from './index.js';

expectType<string[]>(deepKeys({foo: {bar: {baz: 'qux'}}}));
