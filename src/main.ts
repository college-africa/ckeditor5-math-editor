/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import {
  ClassicEditor,
  Bold,
  Essentials,
  Heading,
  Italic,
  Paragraph,
  List,
  Plugin,
} from 'ckeditor5';
import 'ckeditor5/ckeditor5.css';
import MathEditor from './cke/plugin';

class Timestamp extends Plugin {
  init() {
    console.log('Timestamp was initialized');
  }
}

ClassicEditor.create(document.querySelector('#editor') as HTMLElement, {
  plugins: [
    Essentials,
    Paragraph,
    Heading,
    List,
    Bold,
    Italic,
    Timestamp,
    MathEditor,
  ],
  toolbar: [
    'heading',
    'bold',
    'italic',
    'numberedList',
    'bulletedList',
    'mathEditor',
  ],
  licenseKey: 'GPL',
});
