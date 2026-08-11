import { useEffect, useMemo, useState, useCallback } from "react";
import { fetchTeachersPage } from "../firebase/db";
import TeacherCard from "../components/TeacherCard/TeacherCard";
import Filters from "../components/Filters/Filters";
import Loader from "../components/Loader/Loader";
import BookingModal from "../components/BookingModal/BookingModal";
import NotAuthModal from "../components/NotAuthModal/NotAuthModal";
import AuthModal from "../components/AuthModal/AuthModal";
import styles from "./Teachers.module.css";

const PAGE_SIZE = 4;

const matchesFilters = (teacher, filters) => {
  const matchesLanguage =
    !filters.language || teacher.languages?.includes(filters.language);
  const matchesLevel =
    !filters.level || teacher.levels?.includes(filters.level);
  const matchesPrice =
    !filters.price || Number(teacher.price_per_hour) <= Number(filters.price);
  return matchesLanguage && matchesLevel && matchesPrice;
};

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [lastKey, setLastKey] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [filters, setFilters] = useState({
    language: "",
    level: "",
    price: "",
  });
  const [bookingTeacher, setBookingTeacher] = useState(null);
  const [isNotAuthOpen, setIsNotAuthOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const filteredTeachers = useMemo(
    () => teachers.filter((teacher) => matchesFilters(teacher, filters)),
    [teachers, filters],
  );

  const loadUntilEnough = useCallback(
    async (currentTeachers, currentLastKey, currentFilters, targetCount) => {
      let accumulated = currentTeachers;
      let key = currentLastKey;
      let more = true;

      const matchesCount = () =>
        accumulated.filter((teacher) => matchesFilters(teacher, currentFilters))
          .length;

      while (matchesCount() < targetCount && more) {
        const {
          items,
          lastKey: newLastKey,
          hasMore: pageHasMore,
        } = await fetchTeachersPage(key);
        accumulated = [...accumulated, ...items];
        key = newLastKey;
        more = pageHasMore;
        if (items.length === 0) break;
      }

      return { teachers: accumulated, lastKey: key, hasMore: more };
    },
    [],
  );

  useEffect(() => {
    const loadFirstPage = async () => {
      setIsLoading(true);
      const result = await loadUntilEnough([], null, filters, PAGE_SIZE);
      setTeachers(result.teachers);
      setLastKey(result.lastKey);
      setHasMore(result.hasMore);
      setIsLoading(false);
    };
    loadFirstPage();
  }, [filters, loadUntilEnough]);

  const handleLoadMore = async () => {
    setIsLoadingMore(true);
    const targetCount = filteredTeachers.length + PAGE_SIZE;
    const result = await loadUntilEnough(
      teachers,
      lastKey,
      filters,
      targetCount,
    );
    setTeachers(result.teachers);
    setLastKey(result.lastKey);
    setHasMore(result.hasMore);
    setIsLoadingMore(false);
  };

  return (
    <section className={styles.page}>
      <Filters filters={filters} onChange={setFilters} />

      {isLoading ? (
        <Loader />
      ) : (
        <>
          {filteredTeachers.length === 0 ? (
            <p className={styles.empty}>
              No teachers match the selected filters
            </p>
          ) : (
            <ul className={styles.list}>
              {filteredTeachers.map((teacher) => (
                <TeacherCard
                  key={teacher.id}
                  teacher={teacher}
                  onBookTrial={setBookingTeacher}
                  onRequireAuth={() => setIsNotAuthOpen(true)}
                />
              ))}
            </ul>
          )}

          {hasMore && (
            <button
              type="button"
              className={styles.loadMore}
              onClick={handleLoadMore}
              disabled={isLoadingMore}
            >
              {isLoadingMore ? "Loading..." : "Load more"}
            </button>
          )}
        </>
      )}

      <BookingModal
        isOpen={Boolean(bookingTeacher)}
        onClose={() => setBookingTeacher(null)}
        teacher={bookingTeacher}
      />

      <NotAuthModal
        isOpen={isNotAuthOpen}
        onClose={() => setIsNotAuthOpen(false)}
        onLoginClick={() => setIsAuthModalOpen(true)}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode="login"
      />
    </section>
  );
};

export default Teachers;
