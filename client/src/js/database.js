import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  // create connection to database
  const contactDb = await openDB('jate', 1);

  // create new transaction
  const tx = contactDb.transaction('jate', 'readwrite');

  // open up the desired object store
  const store = tx.objectStore('jate');

  // .put() method on the store
  const request = store.put({ content: content });

  // get confirmation of the request
  const result = await request;

  console.log('Content saved to the database.', result);

  ///// console.error('putDb not implemented')
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  //// console.error('getDb not implemented')

  // create connection to the database
  const contactDb = await openDB('jate', 1);

  // create new transaction
  const tx = contactDb.transaction('jate', 'readonly');

  // open the desired object store
  const store = tx.objectStore('jate');

  // .getAll() method to get all data
  const request = store.getAll();

  // get confirmation of request
  const result = await request;
  console.log('result.value', result);
  return result;
};

initdb();
