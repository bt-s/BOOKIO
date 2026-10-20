// @vitest-environment node
// Storage upload test. Runs in a Node environment: the modular Storage SDK
// uses a fetch-based connection there, which works against the emulator;
// jsdom's XHR layer mangles resumable uploads.
import {describe, it, expect, beforeAll} from 'vitest';
import {connectStorageEmulator} from 'firebase/storage';

import Firebase from '../firebase/firebase';
import {uploadPictureToFirebase} from '../helpers/storageHelper';

const fb = new Firebase();

beforeAll(() => {
  connectStorageEmulator(fb.storage, 'localhost', 9299);
});

describe('storage helper (emulator)', () => {
  it('uploads a file and resolves with a download URL callback', async () => {
    const file = new File(['fake-image-bytes'], 'cover.jpg', {
      type: 'image/jpeg'
    });
    let cbUrl = null;
    await uploadPictureToFirebase(file, 'books/test-book', fb, url => {
      cbUrl = url;
    });
    expect(cbUrl).toContain('cover.jpg');
  });
});
