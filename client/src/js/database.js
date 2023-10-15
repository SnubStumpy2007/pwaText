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
  const db = await openDB('jate', 1);
  const tx = db.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  
  try {
    const newItem = { content, timestamp: Date.now() };
    const key = await store.add(newItem);
    console.log(`Added item with key: ${key}`);
  } catch (error) {
    console.error('Error adding item:', error);
  } finally {
    await tx.done;
  }
};


// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const db = await openDB('jate', 1);
  const tx = db.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  
  try {
    const contentList = await store.getAll();
    return contentList;
  } catch (error) {
    console.error('Error getting content:', error);
    return [];
  } finally {
    await tx.done;
  }
};


initdb();
