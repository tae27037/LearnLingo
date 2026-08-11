import {
  ref,
  query,
  orderByKey,
  startAfter,
  limitToFirst,
  get,
  set,
  remove,
} from "firebase/database";
import { db } from "./config";

const TEACHERS_PATH = "teachers";
const PAGE_SIZE = 4;

export const fetchTeachersPage = async (lastKey = null) => {
  const teachersRef = ref(db, TEACHERS_PATH);

  const constraints = lastKey
    ? [orderByKey(), startAfter(lastKey), limitToFirst(PAGE_SIZE)]
    : [orderByKey(), limitToFirst(PAGE_SIZE)];

  const teachersQuery = query(teachersRef, ...constraints);
  const snapshot = await get(teachersQuery);

  const items = [];
  snapshot.forEach((child) => {
    items.push({ id: child.key, ...child.val() });
  });

  return {
    items,
    lastKey: items.length ? items[items.length - 1].id : lastKey,
    hasMore: items.length === PAGE_SIZE,
  };
};

export const fetchAllTeachers = async () => {
  const snapshot = await get(ref(db, TEACHERS_PATH));
  const items = [];
  snapshot.forEach((child) => {
    items.push({ id: child.key, ...child.val() });
  });
  return items;
};

const favoritePath = (uid, teacherId) => `users/${uid}/favorites/${teacherId}`;

export const addFavorite = (uid, teacherId) =>
  set(ref(db, favoritePath(uid, teacherId)), true);

export const removeFavorite = (uid, teacherId) =>
  remove(ref(db, favoritePath(uid, teacherId)));

export const fetchFavoriteIds = async (uid) => {
  const snapshot = await get(ref(db, `users/${uid}/favorites`));
  const value = snapshot.val();
  return value ? Object.keys(value) : [];
};

export const saveTrialBooking = (bookingData) => {
  const bookingsRef = ref(db, `bookings/${Date.now()}`);
  return set(bookingsRef, bookingData);
};
