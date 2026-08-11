import { useEffect, useState } from "react";
import { fetchAllTeachers } from "../firebase/db";
import { useFavorites } from "../context/FavoritesContext";
import TeacherCard from "../components/TeacherCard/TeacherCard";
import Loader from "../components/Loader/Loader";
import BookingModal from "../components/BookingModal/BookingModal";
import styles from "./Teachers.module.css";

const Favorites = () => {
  const { favoriteIds } = useFavorites();
  const [teachers, setTeachers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [bookingTeacher, setBookingTeacher] = useState(null);

  useEffect(() => {
    const loadTeachers = async () => {
      setIsLoading(true);
      const data = await fetchAllTeachers();
      setTeachers(data);
      setIsLoading(false);
    };
    loadTeachers();
  }, []);

  const favoriteTeachers = teachers.filter((teacher) =>
    favoriteIds.includes(teacher.id),
  );

  return (
    <section className={styles.page}>
      {isLoading ? (
        <Loader />
      ) : favoriteTeachers.length === 0 ? (
        <p className={styles.empty}>
          You haven&apos;t added any teachers to favorites yet.
        </p>
      ) : (
        <ul className={styles.list}>
          {favoriteTeachers.map((teacher) => (
            <TeacherCard
              key={teacher.id}
              teacher={teacher}
              onBookTrial={setBookingTeacher}
              onRequireAuth={() => {}}
            />
          ))}
        </ul>
      )}

      <BookingModal
        isOpen={Boolean(bookingTeacher)}
        onClose={() => setBookingTeacher(null)}
        teacher={bookingTeacher}
      />
    </section>
  );
};

export default Favorites;
